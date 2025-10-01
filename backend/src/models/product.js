import mongoose from "mongoose"

const productSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    images: [String],
    category: {type: String, enum: ["pineapple", "sucker", "seedling", "other"], required: true},
    isActive: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now}
} )

export default mongoose.model( "Product", productSchema )
