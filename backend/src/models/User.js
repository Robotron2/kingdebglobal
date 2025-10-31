import mongoose from "mongoose"


const userSchema = new mongoose.Schema( {
    fullName: {type: String, required: true},
    email: {type: String, unique: true, required: true, lowercase: true},
    password: {type: String, required: true, select: false},
    role: {type: String, enum: ["user", "admin", "farmer"], default: "user"},
    phone: String,
    address: String,

    // Bank details
    bankName: String,
    bankAccountNumber: String,
    bankAccountName: String,

    verified: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
} )



export default mongoose.model( "User", userSchema )
