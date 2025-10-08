import rateLimit from "express-rate-limit"
import ApiError from "../utils/ApiError.js"


const createRateLimiter = ( options ) => {
    return rateLimit( {
        ...options,
        handler: ( req, res, next ) => {
            next( new ApiError( options.errorMessage || "Too many requests", 429 ) )
        },
    } )
}


export const resetPasswordLimiter = createRateLimiter( {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    errorMessage: "Too many password reset attempts, please try again later.",
} )
