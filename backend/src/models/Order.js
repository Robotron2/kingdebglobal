import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema(
	{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			min: [1, "Quantity cannot be less than 1"],
		},
		priceAtPurchase: {
			type: Number,
			required: true,
		},
	},
	{ _id: false }
)

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [orderItemSchema],
		totalAmount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
			default: "pending",
		},
		shippingAddress: {
			fullName: { type: String },
			address: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			postalCode: { type: String },
		},
		paymentMethod: { type: String, enum: ["paystack", "card", "bank_transfer", "wallet"], required: true },
		paidAt: Date,
		deliveredAt: Date,
	},
	{ timestamps: true }
)

export default mongoose.model("Order", orderSchema)
