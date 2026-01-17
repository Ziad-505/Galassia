import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL || "redis://localhost:6379", {
	retryStrategy: (times) => {
		if (times > 3) {
			console.log("⚠️  Redis connection failed. Running without Redis (sessions won't persist).");
			return null; // Stop retrying
		}
		return Math.min(times * 50, 2000);
	},
	maxRetriesPerRequest: 3,
	lazyConnect: true,
});

redis.on("error", () => {
	// Silently handle errors to prevent spam
});

redis.connect().catch(() => {
	console.log("⚠️  Redis unavailable. Running without cache (sessions won't persist between restarts).");
});
