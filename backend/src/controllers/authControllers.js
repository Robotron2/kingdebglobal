import User from "../models/User.js"
import catchAsync from "../utils/catchAsync.js"
import ApiError from "../utils/ApiError.js"
import generateToken from "../utils/generateToken.js"

export const register = catchAsync( async ( req, res, next ) => {
    const {fullName, email, password} = req.body

    const existingUser = await User.findOne( {email} )
    if ( existingUser ) return next( new ApiError( "Email already registered", 400 ) )

    const user = await User.create( {fullName, email, password} )

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
    //
} )