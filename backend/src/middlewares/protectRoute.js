import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js"
import User from "../models/User.js"

export const protect = async ( req, res, next ) => {
    let token
    if ( req.headers.authorization && req.headers.authorization.startsWith( "Bearer" ) ) {
        token = req.headers.authorization.split( " " )[1]
    }
    if ( !token ) return next( new ApiError( "Not authorized", 401 ) )

    try {
        const decoded = jwt.verify( token, process.env.JWT_SECRET )
        req.user = await User.findById( decoded.id ).select( "-password" )
        next()
    } catch ( err ) {
        return next( new ApiError( "Invalid token", 401 ) )
    }
}

export const restrictTo = ( ...roles ) => {
    return ( req, res, next ) => {
        if ( !roles.includes( req.user.role ) ) {
            return next( new ApiError( "Permission denied", 403 ) )
        }
        next()
    }
}

// app.post( "/projects", protect, restrictTo( "admin" ), createProject )
// app.post( "/invest/:projectId", protect, restrictTo( "user" ), investInProject )
