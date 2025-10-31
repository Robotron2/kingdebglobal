import mongoose from "mongoose"

const tokenSchema = new mongoose.Schema( {
    email: {type: String, required: true},
    token: {type: String, required: true},
    attempts: {type: Number, default: 0},
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900 // 15 minutes
    }
} )

// Compound index for faster lookups
tokenSchema.index( {email: 1, token: 1} )

export default mongoose.model( "Token", tokenSchema )
