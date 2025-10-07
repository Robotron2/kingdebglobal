import User from "../models/User.js"
import catchAsync from "../utils/catchAsync.js"
import ApiError from "../utils/ApiError.js"
import generateToken from "../utils/generateToken.js"
import {comparePassword, hashPassword} from "../utils/bcryptUtils.js"
import Token from "../models/Token.js"
import {forgotPasswordMailer, sendRegisterEmail} from "../utils/mailer.js"

export const register = catchAsync( async ( req, res, next ) => {
    const {fullName, email, password} = req.body

    const existingUser = await User.findOne( {email} )
    if ( existingUser ) return next( new ApiError( "Email already registered", 400 ) )

    const hashedPassword = await hashPassword( password )
    const user = await User.create( {fullName, email, password: hashedPassword} )

    res.status( 201 ).json( {
        success: true,
        token: generateToken( user._id ),
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    } )
    sendRegisterEmail( email, fullName ).catch( ( err ) => {
        console.error( `Failed to send registration email to ${ email }`, err )
    } )
} )

export const login = catchAsync( async ( req, res, next ) => {
    const {email, password} = req.body

    const user = await User.findOne( {email} ).select( "+password" )
    if ( !user ) return next( new ApiError( "Invalid email or password", 401 ) )

    const isMatch = await comparePassword( password, user.password )
    if ( !isMatch ) return next( new ApiError( "Invalid email or password", 401 ) )

    return res.status( 200 ).json( {
        success: true,
        token: generateToken( user._id ),
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    } )
} )

export const sendResetOTP = catchAsync( async ( req, res, next ) => {
    const {email} = req.body
    if ( !email ) return next( new ApiError( "Provide a valid email address", 400 ) )

    const user = await User.findOne( {email} )
    if ( !user ) return next( new ApiError( "User not found", 404 ) )

    // Delete existing token if any
    await Token.findOneAndDelete( {email} )

    // Generate OTP (6-digit)
    const token = Math.floor( 100000 + Math.random() * 900000 ).toString()
    await Token.create( {token, email} )

    const tokenSent = await forgotPasswordMailer( email, token )
    if ( !tokenSent ) return next( new ApiError( "Error sending OTP", 500 ) )

    return res.status( 200 ).json( {
        success: true,
        message: "Reset OTP sent successfully",
    } )
} )

export const resetPassword = catchAsync( async ( req, res, next ) => {
    const {email, token, newPassword, confirmNewPassword} = req.body

    if ( !email ) {
        return next( new ApiError( "Provide a valid email address", 400 ) )
    }

    if ( newPassword !== confirmNewPassword ) {
        return next( new ApiError( "New password must be a match", 400 ) )
    }
    if ( !token ) {
        return next( new ApiError( "You must provide a valid OTP", 400 ) )
    }

    const MAX_ATTEMPTS = 5

    const resetToken = await Token.findOne( {email, token} )

    if ( !resetToken ) {
        // Check if token exists for the email but token is wrong
        const tokenRecord = await Token.findOne( {email} )
        if ( tokenRecord ) {
            tokenRecord.attempts += 1
            await tokenRecord.save()

            if ( tokenRecord.attempts >= MAX_ATTEMPTS ) {
                await Token.findOneAndDelete( {email} )
                return next( new ApiError( "Too many invalid attempts. Request a new OTP.", 429 ) ) // Too Many Requests
            }
        }

        return next( new ApiError( "Invalid OTP", 400 ) )
    }

    const expirationTime = new Date( resetToken.createdAt.getTime() + 15 * 60 * 1000 )

    if ( expirationTime < new Date() ) {
        await Token.findOneAndDelete( {email, token} )
        return next( new ApiError( "Expired OTP, please request a new one", 400 ) )
    }

    const hashedPassword = await hashPassword( newPassword )
    await User.findOneAndUpdate( {email}, {password: hashedPassword} )
    await Token.findOneAndDelete( {email, token} )

    return res.status( 200 ).json( {
        success: true,
        message: "Password reset successfully",
    } )
} )