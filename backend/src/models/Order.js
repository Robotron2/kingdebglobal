import mongoose from "mongoose"

const orderSchema = new mongoose.Schema( {
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    products: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true}
        }
    ],
    totalAmount: {type: Number, required: true},
    status: {
        type: String,
        enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    transaction: {type: mongoose.Schema.Types.ObjectId, ref: "Transaction"},
    paymentMethod: {type: String, enum: ["paystack", "card", "bank_transfer", "wallet"], required: true},
    createdAt: {type: Date, default: Date.now}
} )

export default mongoose.model( "Order", orderSchema )
