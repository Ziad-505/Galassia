import { ArrowRight, CheckCircle, Diamond, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId,
				});
				clearCart();
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		// Check for Stripe session ID (card payment)
		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		// Check for order ID (cash payment)
		const orderId = new URLSearchParams(window.location.search).get("order_id");

		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else if (orderId) {
			// Cash order already created, just clear cart and show success
			clearCart();
			setIsProcessing(false);
		} else {
			setIsProcessing(false);
			setError("No order information found");
		}
	}, [clearCart]);

	if (isProcessing) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<Diamond className='w-12 h-12 text-yellow-500 mx-auto animate-pulse' />
					<p className='mt-4 font-elegant text-gray-400 text-lg'>Processing your order...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<p className='font-elegant text-red-400 text-lg'>Error: {error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-[80vh] flex items-center justify-center px-4'>
			{/* Gold Confetti */}
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={500}
				recycle={false}
				colors={['#D4AF37', '#E8D5B7', '#B8860B', '#F5DEB3', '#DAA520']}
			/>

			<motion.div 
				className='max-w-md w-full luxury-card overflow-hidden relative z-10'
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className='p-8 text-center'>
					{/* Success Icon */}
					<motion.div 
						className='mb-6'
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
					>
						<div className='relative inline-block'>
							<CheckCircle className='w-20 h-20 text-yellow-500' />
							<Diamond className='w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse' />
						</div>
					</motion.div>

					{/* Success Message */}
					<h1 className='font-galassia text-2xl sm:text-3xl text-gold-gradient mb-3'>
						Thank You
					</h1>
					<p className='font-elegant text-xl text-gray-300 mb-2'>
						Your order has been placed successfully
					</p>
					<p className='font-modern text-sm text-gray-500 mb-6'>
						A confirmation email has been sent to you
					</p>

					{/* Order Info */}
					<div className='bg-gray-800/50 rounded-lg p-4 mb-6 border border-yellow-700/20'>
						<div className='flex items-center justify-between mb-3'>
							<span className='font-modern text-xs text-gray-500 uppercase tracking-wider'>Order Number</span>
							<span className='font-modern text-sm text-yellow-500'>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='font-modern text-xs text-gray-500 uppercase tracking-wider'>Estimated Delivery</span>
							<span className='font-modern text-sm text-yellow-500'>3-5 Business Days</span>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='space-y-3'>
						<motion.button
							className='w-full btn-gold rounded-md flex items-center justify-center gap-2'
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Heart className='w-5 h-5' />
							<span className='font-modern text-sm uppercase tracking-wider'>Thank You for Choosing Galassia</span>
						</motion.button>
						
						<Link
							to={"/"}
							className='w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 hover:bg-gray-700 
							border border-gray-700 hover:border-yellow-700/50 rounded-md text-gray-300 hover:text-yellow-500 transition-all duration-300'
						>
							<span className='font-modern text-sm uppercase tracking-wider'>Continue Shopping</span>
							<ArrowRight className='w-4 h-4' />
						</Link>
					</div>
				</div>

				{/* Decorative Footer */}
				<div className='bg-gradient-to-r from-yellow-700/20 via-yellow-600/10 to-yellow-700/20 py-4 text-center'>
					<p className='font-elegant text-sm text-gray-400 italic'>
						Every piece tells a story. Yours begins now.
					</p>
				</div>
			</motion.div>
		</div>
	);
};
export default PurchaseSuccessPage;
