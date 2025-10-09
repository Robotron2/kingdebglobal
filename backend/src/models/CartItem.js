import mongoose from "mongoose"

const cartItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		min: [1, "Quantity cannot be less than 1"],
		default: 1,
	},
})

export default mongoose.model("CartItem", cartItemSchema)
