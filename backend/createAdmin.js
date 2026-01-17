import mongoose from "mongoose";
import User from "./models/user.model.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const createAdminUser = async () => {
	try {
		// Connect to MongoDB
		await mongoose.connect(process.env.MONGO_URI);
		console.log("✅ Connected to MongoDB");

		// Check if admin already exists
		const existingAdmin = await User.findOne({ email: "ziad@ziad.com" });
		if (existingAdmin) {
			console.log("⚠️  Admin user already exists");
			await mongoose.disconnect();
			return;
		}

		// Create admin user
		const admin = await User.create({
			name: "ziad",
			email: "ziad@ziad.com",
			password: "313018",
			role: "admin",
		});

		console.log("✅ Admin user created successfully!");
		console.log("📧 Email:", admin.email);
		console.log("👤 Name:", admin.name);
		console.log("🔑 Role:", admin.role);

		await mongoose.disconnect();
		console.log("✅ Disconnected from MongoDB");
	} catch (error) {
		console.error("❌ Error creating admin user:", error.message);
		await mongoose.disconnect();
	}
};

createAdminUser();
