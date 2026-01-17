import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// Make Stripe optional - only initialize if secret key is configured
export const stripe = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_your_stripe_secret_key'
	? new Stripe(process.env.STRIPE_SECRET_KEY)
	: null;

export const isStripeConfigured = () => {
	return stripe !== null;
};
