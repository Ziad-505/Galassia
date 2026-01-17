import { XCircle, ArrowLeft, Diamond, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className='min-h-[80vh] flex items-center justify-center px-4'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full luxury-card overflow-hidden relative z-10'
			>
				<div className='p-8 text-center'>
					{/* Cancel Icon */}
					<motion.div 
						className='mb-6'
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
					>
						<div className='relative inline-block'>
							<XCircle className='w-20 h-20 text-red-400' />
							<Diamond className='w-6 h-6 text-gray-500 absolute -top-1 -right-1' />
						</div>
					</motion.div>

					{/* Cancel Message */}
					<h1 className='font-galassia text-2xl sm:text-3xl text-gray-300 mb-3'>
						Order Cancelled
					</h1>
					<p className='font-elegant text-lg text-gray-400 mb-6'>
						Your order has been cancelled. No charges have been made.
					</p>

					{/* Support Info */}
					<div className='bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700'>
						<div className='flex items-center justify-center gap-2 mb-2'>
							<MessageCircle className='w-4 h-4 text-yellow-500' />
							<span className='font-modern text-xs text-gray-400 uppercase tracking-wider'>Need Assistance?</span>
						</div>
						<p className='font-elegant text-sm text-gray-500'>
							If you encountered any issues during checkout, our concierge team is here to help.
						</p>
					</div>

					{/* Action Button */}
					<Link
						to={"/"}
						className='w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 hover:bg-gray-700 
						border border-gray-700 hover:border-yellow-700/50 rounded-md text-gray-300 hover:text-yellow-500 transition-all duration-300'
					>
						<ArrowLeft className='w-4 h-4' />
						<span className='font-modern text-sm uppercase tracking-wider'>Return to Collections</span>
					</Link>
				</div>

				{/* Decorative Footer */}
				<div className='bg-gradient-to-r from-gray-800/50 via-gray-700/30 to-gray-800/50 py-4 text-center'>
					<p className='font-elegant text-sm text-gray-500 italic'>
						We hope to see you again soon.
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;
