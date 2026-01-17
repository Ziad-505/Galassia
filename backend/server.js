import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import orderRoutes from "./routes/order.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config({ path: ".env" });

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// CORS configuration
app.use(cors({
	origin: process.env.CLIENT_URL || "http://localhost:5173",
	credentials: true,
}));

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/orders", orderRoutes);

// Only serve static files if this was a monolith deployment (backend serving frontend)
// Since frontend is on Vercel, we do NOT want this in production.
// if (process.env.NODE_ENV === "production" /* && !process.env.RENDER */) {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
//
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

app.listen(PORT, () => {
	console.log("✨ Galassia Server is running on http://localhost:" + PORT);
	console.log("💎 Luxury Gemstones & Fine Jewelry");
	connectDB();
});
