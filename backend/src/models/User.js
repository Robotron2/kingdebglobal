import mongoose from "mongoose"

const userSchema = new mongoose.Schema( {
    fullName: {type: String, required: true},
    email: {type: String, unique: true, required: true, lowercase: true},
    password: {type: String, required: true, select: false},
    phone: String,
    role: {type: String, enum: ["user", "admin"], default: "user"},
    investments: [{type: mongoose.Schema.Types.ObjectId, ref: "Investment"}],
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
    createdAt: {type: Date, default: Date.now}
} )


export default mongoose.model( "User", userSchema )
