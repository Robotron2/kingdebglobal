import catchAsync from "../utils/catchAsync.js"
import ApiError from "../utils/ApiError.js"
import User from "../models/User.js"

//TODO: 
// UpdateProfile - List allow fields that can be edited by user
// filter incomings
// update accordingly

// Get profile details

export const updateProfile = catchAsync( async ( req, res, next ) => {
    const userId = req.user._id

    const allowedFields = ["phone", "address", "bankName", "bankAccountNumber", "bankAccountName"]

    const updates = {}
    for ( const field of allowedFields ) {
        if ( req.body[field] !== undefined ) {
            updates[field] = req.body[field]
        }
    }

    if ( Object.keys( updates ).length === 0 ) {
        return next( new ApiError( "No valid fields provided for update", 400 ) )
    }

    const updatedUser = await User.findByIdAndUpdate( userId, updates, {
        new: true,
        runValidators: true,
    } ).select( "-password" )

    if ( !updatedUser ) return next( new ApiError( "User not found", 404 ) )

    return res.status( 200 ).json( {
        status: "success",
        data: updatedUser,
    } )
} )

export const getProfile = catchAsync( async ( req, res, next ) => {
    const user = await User.findById( req.user.id ).select( '-password' )

    if ( !user ) {
        return next( new ApiError( 'User not found', 404 ) )
    }

    return res.status( 200 ).json( {
        status: 'success',
        data: {user}
    } )
} )
