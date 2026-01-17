import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const fixOrderIndex = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("✅ Connected to MongoDB");

		const db = mongoose.connection.db;
		const ordersCollection = db.collection("orders");

		// Drop the old unique index
		try {
			await ordersCollection.dropIndex("stripeSessionId_1");
			console.log("✅ Dropped old stripeSessionId index");
		} catch (error) {
			if (error.code === 27) {
				console.log("ℹ️  Index doesn't exist, continuing...");
			} else {
				throw error;
			}
		}

		// Create new sparse unique index
		await ordersCollection.createIndex(
			{ stripeSessionId: 1 }, 
			{ unique: true, sparse: true }
		);
		console.log("✅ Created new sparse unique index on stripeSessionId");

		console.log("\n🎉 Index fix completed successfully!");
		process.exit(0);
	} catch (error) {
		console.error("❌ Error fixing index:", error);
		process.exit(1);
	}
};

fixOrderIndex();
