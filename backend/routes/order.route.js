import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import Order from "../models/order.model.js";

const router = express.Router();

// Get logged-in user's orders
router.get("/my-orders", protectRoute, async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id })
			.populate({
				path: "products.product",
				select: "name image price"
			})
			.sort({ createdAt: -1 });
			
		res.json(orders);
	} catch (error) {
		console.error("Error fetching user orders:", error);
		res.status(500).json({ message: "Error fetching orders", error: error.message });
	}
});

// Get all orders (admin only)
router.get("/all", protectRoute, async (req, res) => {
	try {
		if (req.user.role !== "admin") {
			return res.status(403).json({ message: "Access denied. Admin only." });
		}

		const orders = await Order.find()
			.populate("user", "name email")
			.populate({
				path: "products.product",
				select: "name image price"
			})
			.sort({ createdAt: -1 });
			
		res.json(orders);
	} catch (error) {
		console.error("Error fetching all orders:", error);
		res.status(500).json({ message: "Error fetching orders", error: error.message });
	}
});

// Update order status (admin only)
router.patch("/status/:orderId", protectRoute, async (req, res) => {
	try {
		if (req.user.role !== "admin") {
			return res.status(403).json({ message: "Access denied. Admin only." });
		}

		const { orderId } = req.params;
		const { status } = req.body;

		const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
		if (!validStatuses.includes(status)) {
			return res.status(400).json({ message: "Invalid status value" });
		}

		const order = await Order.findByIdAndUpdate(
			orderId,
			{ status },
			{ new: true }
		)
			.populate("user", "name email")
			.populate({
				path: "products.product",
				select: "name image price"
			});

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		res.json(order);
	} catch (error) {
		console.error("Error updating order status:", error);
		res.status(500).json({ message: "Error updating order status", error: error.message });
	}
});

export default router;
