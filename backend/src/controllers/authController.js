import User from "../models/User.js"
import catchAsync from "../utils/catchAsync.js"
import ApiError from "../utils/ApiError.js"
import generateToken from "../utils/generateToken.js"
import {comparePassword, hashPassword} from "../utils/bcryptUtils.js"

export const register = catchAsync( async ( req, res, next ) => {
    const {fullName, email, password} = req.body

    const existingUser = await User.findOne( {email} )
    if ( existingUser ) return next( new ApiError( "Email already registered", 400 ) )
    const hashedPassword = await hashPassword( password )

    const user = await User.create( {fullName, email, password: hashedPassword} )

    res.status( 201 ).json( {
        status: "success",
        token: generateToken( user._id ),
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    } )
} )

export const login = catchAsync( async ( req, res, next ) => {
    const {email, password} = req.body

    const user = await User.findOne( {email} ).select( "+password" )
    if ( !user ) return next( new ApiError( "Email not found", 404 ) )

    const isMatch = await comparePassword( password, user.password )
    // console.log( isMatch )
    if ( !isMatch ) return next( new ApiError( "Invalid password", 401 ) )

    res.json( {
        status: "success",
        token: generateToken( user._id ),
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    } )
} )