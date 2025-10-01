import mongoose from "mongoose"

const investmentPlanSchema = new mongoose.Schema( {
    name: {type: String, required: true, unique: true},
    description: String,
    minAmount: {type: Number, required: true},
    maxAmount: {type: Number, required: true},
    roiPercentage: {type: Number, required: true},
    durationInDays: {type: Number, required: true},
    isActive: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now}
} )

export default mongoose.model( "InvestmentPlan", investmentPlanSchema )
