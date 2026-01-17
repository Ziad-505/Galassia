import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Gift, Tag, X } from "lucide-react";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");
	const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = () => {
		if (!userInputCode) return;
		applyCoupon(userInputCode);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};

	return (
		<motion.div
			className='luxury-card p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			{/* Header */}
			<div className='flex items-center gap-3 mb-4'>
				<Gift className='w-5 h-5 text-yellow-500' />
				<h3 className='font-galassia text-lg text-gold-gradient'>Special Offers</h3>
			</div>

			<div className='space-y-4'>
				{/* Input Section */}
				<div>
					<label htmlFor='voucher' className='block font-modern text-xs text-gray-400 uppercase tracking-wider mb-2'>
						Have a discount code?
					</label>
					<div className='flex gap-3'>
						<input
							type='text'
							id='voucher'
							className='flex-1 bg-gray-800/50 border border-gray-700 rounded-md 
							py-2.5 px-4 font-modern text-sm text-white placeholder-gray-500 
							focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all duration-300'
							placeholder='Enter code'
							value={userInputCode}
							onChange={(e) => setUserInputCode(e.target.value)}
						/>
						<motion.button
							type='button'
							className='px-5 py-2.5 bg-gray-800 border border-gray-700 rounded-md font-modern text-sm text-white uppercase tracking-wider
							hover:bg-gray-700 hover:border-yellow-700/50 transition-all duration-300'
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={handleApplyCoupon}
						>
							Apply
						</motion.button>
					</div>
				</div>

				{/* Applied Coupon */}
				{isCouponApplied && coupon && (
					<motion.div 
						className='bg-yellow-600/10 border border-yellow-600/30 rounded-md p-4'
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
					>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<Tag className='w-5 h-5 text-yellow-500' />
								<div>
									<p className='font-modern text-sm text-white uppercase tracking-wider'>
										{coupon.code}
									</p>
									<p className='font-elegant text-yellow-500'>
										{coupon.discountPercentage}% off your order
									</p>
								</div>
							</div>
							<motion.button
								type='button'
								className='p-2 text-gray-400 hover:text-red-400 transition-colors duration-200'
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={handleRemoveCoupon}
							>
								<X className='w-5 h-5' />
							</motion.button>
						</div>
					</motion.div>
				)}

				{/* Available Coupon */}
				{coupon && !isCouponApplied && (
					<div className='border-t border-gray-700 pt-4'>
						<p className='font-modern text-xs text-gray-400 uppercase tracking-wider mb-2'>
							Your Available Offer
						</p>
						<div className='flex items-center justify-between bg-gray-800/30 rounded-md p-3'>
							<div className='flex items-center gap-2'>
								<span className='w-2 h-2 bg-yellow-500 rotate-45' />
								<span className='font-modern text-sm text-white'>{coupon.code}</span>
							</div>
							<span className='font-elegant text-yellow-500'>{coupon.discountPercentage}% off</span>
						</div>
					</div>
				)}
			</div>
		</motion.div>
	);
};
export default GiftCouponCard;
