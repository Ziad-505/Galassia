import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}); // find all products
		res.json({ products });
	} catch (error) {
		console.log("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		// Try to get from Redis cache first
		try {
			const cachedProducts = await redis.get("featured_products");
			if (cachedProducts) {
				return res.json(JSON.parse(cachedProducts));
			}
		} catch (redisError) {
			console.log("Redis unavailable, fetching from database");
		}

		// Fetch from MongoDB
		const featuredProducts = await Product.find({ isFeatured: true }).lean();

		// Try to cache in Redis for future requests
		try {
			await redis.set("featured_products", JSON.stringify(featuredProducts));
		} catch (redisError) {
			console.log("Redis unavailable, skipping cache");
		}

		res.json(featuredProducts);
	} catch (error) {
		console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category, quantity, discount } = req.body;

		// Validate required fields
		if (!name || !description || !price || !category) {
			return res.status(400).json({ 
				message: "Missing required fields: name, description, price, and category are required" 
			});
		}

		let imageUrl = "";

		// Upload image to Cloudinary if provided
		if (image) {
			try {
				const cloudinaryResponse = await cloudinary.uploader.upload(image, { 
					folder: "galassia",
					resource_type: "auto"
				});
				imageUrl = cloudinaryResponse.secure_url;
			} catch (cloudinaryError) {
				console.log("Cloudinary error:", cloudinaryError.message);
				// Use the base64 image directly if Cloudinary fails
				imageUrl = image;
			}
		}

		const product = await Product.create({
			name,
			description,
			price: Number(price),
			image: imageUrl,
			category,
			quantity: quantity !== undefined ? Number(quantity) : 0,
			discount: discount !== undefined ? Number(discount) : 0,
		});

		// Invalidate cache
		await updateFeaturedProductsCache();

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Try to delete from Cloudinary if image exists and is a Cloudinary URL
		if (product.image && product.image.includes("cloudinary")) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`galassia/${publicId}`);
				console.log("Deleted image from Cloudinary");
			} catch (error) {
				console.log("Error deleting image from Cloudinary (non-fatal):", error.message);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		// Update cache
		await updateFeaturedProductsCache();

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateProduct = async (req, res) => {
	try {
		const { price, quantity, discount } = req.body;
		const product = await Product.findById(req.params.id);
		
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Update fields if provided
		if (price !== undefined) product.price = Number(price);
		if (quantity !== undefined) {
			product.quantity = Number(quantity);
			product.inStock = product.quantity > 0;
		}
		if (discount !== undefined) product.discount = Number(discount);

		const updatedProduct = await product.save();
		await updateFeaturedProductsCache();
		
		res.json(updatedProduct);
	} catch (error) {
		console.log("Error in updateProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedProductsCache() {
	try {
		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		try {
			await redis.set("featured_products", JSON.stringify(featuredProducts));
		} catch (redisError) {
			console.log("Redis unavailable, skipping cache update");
		}
	} catch (error) {
		console.log("Error updating featured products cache:", error.message);
	}
}

export { updateFeaturedProductsCache };
