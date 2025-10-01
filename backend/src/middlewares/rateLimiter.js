import rateLimit from "express-rate-limit"

export const resetPasswordLimiter = rateLimit( {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP/email to 10 requests per windowMs
    message: {
        status: "fail",
        message: "Too many password reset attempts, please try again later."
    },
} )