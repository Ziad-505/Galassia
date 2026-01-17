import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { MoveRight, Diamond, CreditCard, Banknote } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import AddressModal from "./AddressModal";

const stripePromise = loadStripe(
	"pk_test_51KZYccCoOZF2UhtOwdXQl3vcizup20zqKqT9hVUIsVzsdBrhqbUI2fE0ZdEVLdZfeHjeyFXtqaNsyCJCmZWnjNZa00PzMAjlcL"
);

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart, clearCart } = useCartStore();
	const navigate = useNavigate();
	const [paymentMethod, setPaymentMethod] = useState("cash"); // "card" or "cash"
	const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		if (paymentMethod === "card") {
			// Stripe card payment
			try {
				setIsProcessing(true);
				const stripe = await stripePromise;
				const res = await axios.post("/payments/create-checkout-session", {
					products: cart,
					couponCode: coupon ? coupon.code : null,
				});

				const session = res.data;
				const result = await stripe.redirectToCheckout({
					sessionId: session.id,
				});

				if (result.error) {
					console.error("Error:", result.error);
					toast.error("Payment failed. Please try again.");
				}
			} catch (error) {
				console.error("Checkout error:", error);
				toast.error(error.response?.data?.error || "Card payment is not available. Please use Cash on Delivery.");
			} finally {
				setIsProcessing(false);
			}
		} else {
			// Cash on delivery - open address modal
			setIsAddressModalOpen(true);
		}
	};

	const handleCashOrder = async (shippingAddress) => {
		setIsProcessing(true);
		try {
			const res = await axios.post("/payments/cash-order", {
				products: cart,
				shippingAddress,
				couponCode: coupon ? coupon.code : null,
			});

			clearCart();
			toast.success("Order placed successfully!");
			navigate(`/purchase-success?order_id=${res.data.orderId}`);
		} catch (error) {
			console.error("Cash order error:", error);
			toast.error(error.response?.data?.error || "Failed to create order. Please try again.");
		} finally {
			setIsProcessing(false);
			setIsAddressModalOpen(false);
		}
	};

	return (
		<motion.div
			className='luxury-card p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{/* Header */}
			<div className='flex items-center gap-3 mb-6'>
				<Diamond className='w-5 h-5 text-yellow-500' />
				<h3 className='font-galassia text-lg text-gold-gradient'>Order Summary</h3>
			</div>

			{/* Order Details */}
			<div className='space-y-4'>
				<div className='space-y-3'>
					<dl className='flex items-center justify-between'>
						<dt className='font-modern text-sm text-gray-400'>Subtotal</dt>
						<dd className='font-elegant text-white'>${formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between'>
							<dt className='font-modern text-sm text-gray-400'>Savings</dt>
							<dd className='font-elegant text-yellow-500'>-${formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className='flex items-center justify-between'>
							<dt className='font-modern text-sm text-gray-400'>
								Discount Code ({coupon.code})
							</dt>
							<dd className='font-elegant text-yellow-500'>-{coupon.discountPercentage}%</dd>
						</dl>
					)}

					{/* Divider */}
					<div className='border-t border-gray-700 pt-3'>
						<dl className='flex items-center justify-between'>
							<dt className='font-modern text-sm text-white uppercase tracking-wider'>Total</dt>
							<dd className='price-tag text-xl'>${formattedTotal}</dd>
						</dl>
					</div>
				</div>

				{/* Payment Method Selection */}
				<div className='space-y-3 pt-4 border-t border-gray-700'>
					<h4 className='font-modern text-sm text-gray-400 uppercase tracking-wider'>Payment Method</h4>
					<div className='grid grid-cols-2 gap-3'>
						<button
							type='button'
							onClick={() => setPaymentMethod("cash")}
							className={`p-4 rounded-lg border-2 transition-all ${
								paymentMethod === "cash"
									? 'border-yellow-500 bg-yellow-500/10'
									: 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
							}`}
						>
							<Banknote className={`w-6 h-6 mx-auto mb-2 ${
								paymentMethod === "cash" ? 'text-yellow-500' : 'text-gray-400'
							}`} />
							<span className='font-elegant text-sm text-white block'>Cash on Delivery</span>
						</button>
						<button
							type='button'
							onClick={() => setPaymentMethod("card")}
							className={`p-4 rounded-lg border-2 transition-all ${
								paymentMethod === "card"
									? 'border-yellow-500 bg-yellow-500/10'
									: 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
							}`}
						>
							<CreditCard className={`w-6 h-6 mx-auto mb-2 ${
								paymentMethod === "card" ? 'text-yellow-500' : 'text-gray-400'
							}`} />
							<span className='font-elegant text-sm text-white block'>Credit / Debit Card</span>
						</button>
					</div>
				</div>

				{/* Checkout Button */}
				<motion.button
					className='w-full btn-gold rounded-md flex items-center justify-center gap-2 mt-4
						disabled:opacity-50 disabled:cursor-not-allowed'
					whileHover={{ scale: isProcessing ? 1 : 1.02 }}
					whileTap={{ scale: isProcessing ? 1 : 0.98 }}
					onClick={handlePayment}
					disabled={isProcessing}
				>
					{paymentMethod === "card" ? (
						<CreditCard className='w-5 h-5' />
					) : (
						<Banknote className='w-5 h-5' />
					)}
					<span className='font-modern text-sm uppercase tracking-wider'>
						{isProcessing ? 'Processing...' : paymentMethod === "card" ? 'Pay with Card' : 'Place Order'}
					</span>
				</motion.button>

				{/* Continue Shopping Link */}
				<div className='flex items-center justify-center gap-2 pt-4'>
					<span className='font-modern text-xs text-gray-500 uppercase tracking-wider'>or</span>
				</div>
				<Link
					to='/'
					className='flex items-center justify-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors duration-300'
				>
					<span className='font-modern text-sm uppercase tracking-wider'>Continue Shopping</span>
					<MoveRight size={16} />
				</Link>

				{/* Trust Badges */}
				<div className='pt-4 border-t border-gray-700 mt-4'>
					<div className='flex items-center justify-center gap-4 text-gray-500'>
						<span className='flex items-center gap-1 text-xs'>
							<span className='w-1.5 h-1.5 bg-yellow-500 rotate-45' />
							<span className='font-modern uppercase tracking-wider'>Secure Payment</span>
						</span>
						<span className='flex items-center gap-1 text-xs'>
							<span className='w-1.5 h-1.5 bg-yellow-500 rotate-45' />
							<span className='font-modern uppercase tracking-wider'>Free Shipping</span>
						</span>
					</div>
				</div>
			</div>

			{/* Address Modal for Cash on Delivery */}
			<AddressModal
				isOpen={isAddressModalOpen}
				onClose={() => setIsAddressModalOpen(false)}
				onSubmit={handleCashOrder}
				isSubmitting={isProcessing}
			/>
		</motion.div>
	);
};
export default OrderSummary;
