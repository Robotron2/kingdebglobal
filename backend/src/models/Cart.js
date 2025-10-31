import mongoose from "mongoose"

const cartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		items: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "CartItem",
			},
		],
	},
	{ timestamps: true }
)

cartSchema.index({ user: 1 })
export default mongoose.model("Cart", cartSchema)
