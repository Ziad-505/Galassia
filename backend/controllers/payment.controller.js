import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { stripe, isStripeConfigured } from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
	try {
		// Check if Stripe is configured
		if (!isStripeConfigured()) {
			return res.status(500).json({ 
				error: "Payment system is not configured. Please use Cash on Delivery option." 
			});
		}

		const { products, couponCode } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		let totalAmount = 0;

		const lineItems = products.map((product) => {
			// Apply product-level discount if available
			const discount = product.discount || 0;
			const discountedPrice = discount > 0 
				? product.price * (1 - discount / 100)
				: product.price;
			
			const amount = Math.round(discountedPrice * 100); // stripe wants u to send in the format of cents
			totalAmount += amount * product.quantity;

			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: product.name,
						images: [product.image],
						description: discount > 0 ? `${discount}% off` : undefined,
					},
					unit_amount: amount,
				},
				quantity: product.quantity || 1,
			};
		});

		let coupon = null;
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
			if (coupon) {
				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
			}
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			discounts: coupon
				? [
						{
							coupon: await createStripeCoupon(coupon.discountPercentage),
						},
				  ]
				: [],
			metadata: {
				userId: req.user._id.toString(),
				couponCode: couponCode || "",
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
						discount: p.discount || 0,
					}))
				),
			},
		});

		if (totalAmount >= 20000) {
			await createNewCoupon(req.user._id);
		}
		res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
	} catch (error) {
		console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

export const checkoutSuccess = async (req, res) => {
	try {
		const { sessionId } = req.body;
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.payment_status === "paid") {
			if (session.metadata.couponCode) {
				await Coupon.findOneAndUpdate(
					{
						code: session.metadata.couponCode,
						userId: session.metadata.userId,
					},
					{
						isActive: false,
					}
				);
			}

			// create a new Order
			const products = JSON.parse(session.metadata.products);
			
			// Update product quantities - reduce stock
			for (const item of products) {
				const product = await Product.findById(item.id);
				if (product) {
					product.quantity = Math.max(0, product.quantity - item.quantity);
					product.inStock = product.quantity > 0;
					await product.save();
				}
			}
			
			const newOrder = new Order({
				user: session.metadata.userId,
				products: products.map((product) => ({
					product: product.id,
					quantity: product.quantity,
					price: product.price,
				})),
				totalAmount: session.amount_total / 100, // convert from cents to dollars,
				stripeSessionId: sessionId,
				status: "pending",
			});

			await newOrder.save();

			// Clear user's cart after successful order
			const User = (await import("../models/user.model.js")).default;
			await User.findByIdAndUpdate(session.metadata.userId, { cartItems: [] });

			res.status(200).json({
				success: true,
				message: "Payment successful, order created, and coupon deactivated if used.",
				orderId: newOrder._id,
			});
		}
	} catch (error) {
		console.error("Error processing successful checkout:", error);
		res.status(500).json({ message: "Error processing successful checkout", error: error.message });
	}
};

async function createStripeCoupon(discountPercentage) {
	const coupon = await stripe.coupons.create({
		percent_off: discountPercentage,
		duration: "once",
	});

	return coupon.id;
}

async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GALASSIA" + Math.random().toString(36).substring(2, 6).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});

	await newCoupon.save();

	return newCoupon;
}

// Cash on Delivery - Create order without Stripe
export const createCashOrder = async (req, res) => {
	try {
		const { products, shippingAddress, couponCode } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		// Validate shipping address
		if (!shippingAddress || !shippingAddress.name || !shippingAddress.phone || 
			!shippingAddress.address || !shippingAddress.city || !shippingAddress.zipCode) {
			return res.status(400).json({ error: "Complete shipping address is required" });
		}

		// Validate stock and calculate total
		let totalAmount = 0;
		const orderProducts = [];

		for (const item of products) {
			const product = await Product.findById(item._id);
			
			if (!product) {
				return res.status(404).json({ error: `Product ${item.name} not found` });
			}

			// Check stock availability
			const availableQuantity = product.quantity !== undefined ? product.quantity : 999;
			if (availableQuantity < item.quantity) {
				return res.status(400).json({ 
					error: `Insufficient stock for ${product.name}. Available: ${availableQuantity}` 
				});
			}

			// Calculate price with product discount
			const discount = item.discount || 0;
			const discountedPrice = discount > 0 
				? item.price * (1 - discount / 100)
				: item.price;

			totalAmount += discountedPrice * item.quantity;

			orderProducts.push({
				product: product._id,
				quantity: item.quantity,
				price: item.price,
			});

			// Update product stock
			product.quantity = Math.max(0, product.quantity - item.quantity);
			product.inStock = product.quantity > 0;
			await product.save();
		}

		// Apply coupon discount if provided
		let appliedCoupon = null;
		if (couponCode) {
			appliedCoupon = await Coupon.findOne({ 
				code: couponCode, 
				userId: req.user._id, 
				isActive: true 
			});
			
			if (appliedCoupon) {
				const discount = totalAmount * (appliedCoupon.discountPercentage / 100);
				totalAmount -= discount;
				
				// Deactivate coupon after use
				appliedCoupon.isActive = false;
				await appliedCoupon.save();
			}
		}

		// Create order
		const newOrder = new Order({
			user: req.user._id,
			products: orderProducts,
			totalAmount,
			paymentMethod: "cash",
			shippingAddress: {
				name: shippingAddress.name,
				phone: shippingAddress.phone,
				address: shippingAddress.address,
				city: shippingAddress.city,
				zipCode: shippingAddress.zipCode,
			},
			status: "pending",
		});

		await newOrder.save();

		// Clear user's cart
		await User.findByIdAndUpdate(req.user._id, { cartItems: [] });

		// Create new coupon if order total >= $200
		if (totalAmount >= 200) {
			await createNewCoupon(req.user._id);
		}

		res.status(201).json({
			success: true,
			message: "Order created successfully",
			orderId: newOrder._id,
			totalAmount,
		});
	} catch (error) {
		console.error("Error creating cash order:", error);
		res.status(500).json({ 
			message: "Error creating order", 
			error: error.message 
		});
	}
};

