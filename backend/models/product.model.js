import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		image: {
			type: String,
			required: false,
			default: "",
		},
		category: {
			type: String,
			required: true,
			enum: ["diamonds", "rings", "necklaces", "earrings", "bracelets", "gemstones"],
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		// Stock Management
		quantity: {
			type: Number,
			min: 0,
			default: 0,
			required: true,
		},
		// Discount Management
		discount: {
			type: Number,
			min: 0,
			max: 100,
			default: 0,
		},
		// Jewelry-specific fields (optional)
		material: {
			type: String,
			enum: ["gold", "white-gold", "rose-gold", "platinum", "silver", "other"],
		},
		caratWeight: {
			type: Number,
			min: 0,
		},
		gemstoneType: {
			type: String,
			enum: ["diamond", "ruby", "sapphire", "emerald", "pearl", "opal", "amethyst", "topaz", "other"],
		},
		inStock: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
