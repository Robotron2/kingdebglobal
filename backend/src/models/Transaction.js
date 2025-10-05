import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema( {
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    type: {type: String, enum: ["investment", "order", "refund", "withdraw"], required: true},
    kingDebRef: {type: String, required: true},
    paystackRef: String,
    amount: Number,
    relatedInvestment: {type: mongoose.Schema.Types.ObjectId, ref: "Investment"},
    relatedOrder: {type: mongoose.Schema.Types.ObjectId, ref: "Order"},
    status: {type: String, enum: ["pending", "successful", "failed"], default: "pending"},
    paymentGateway: {type: String, default: "paystack"},
    createdAt: {type: Date, default: Date.now}

} )

transactionSchema.index( {kingDebRef: 1, paystackRef: 1} )

export default mongoose.model( "Transaction", transactionSchema )
