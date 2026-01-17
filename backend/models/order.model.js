import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				price: {
					type: Number,
					required: true,
					min: 0,
				},
			},
		],
		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
		stripeSessionId: {
			type: String,
			unique: true,
			sparse: true, // Allows multiple null values
		},
		status: {
			type: String,
			enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
			default: "pending",
		},
		paymentMethod: {
			type: String,
			enum: ["card", "cash"],
			default: "card",
		},
		shippingAddress: {
			name: {
				type: String,
				required: true,
			},
			phone: {
				type: String,
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			zipCode: {
				type: String,
				required: true,
			},
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
