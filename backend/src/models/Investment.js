import mongoose from "mongoose"

const investmentSchema = new mongoose.Schema( {
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    plan: {type: mongoose.Schema.Types.ObjectId, ref: "InvestmentPlan", required: true},
    amount: {type: Number, required: true},
    roiAmount: {type: Number, required: true},
    startDate: {type: Date, default: Date.now},
    maturityDate: {type: Date, required: true},
    status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active"
    },
    payoutStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },
    transaction: {type: mongoose.Schema.Types.ObjectId, ref: "Transaction"}

} )

export default mongoose.model( "Investment", investmentSchema )
