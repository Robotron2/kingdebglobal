import ApiError from "../utils/ApiError.js"

export const requireVerified = ( req, res, next ) => {
    if ( !req.user?.verified ) {
        return next( new ApiError( "Please verify your email to perform this action", 403 ) )
    }
    next()
}
