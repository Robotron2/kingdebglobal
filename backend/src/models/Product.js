import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Product name is required"],
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		price: {
			type: Number,
			required: [true, "Product price is required"],
			min: [0, "Price cannot be negative"],
		},
		stock: {
			type: Number,
			default: 0,
			min: [0, "Stock cannot be negative"],
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		imageUrl: {
			type: String,
			required: [true, "Product image URL is required"],
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
)

productSchema.index({ name: 1 })

export default mongoose.model("Product", productSchema)
