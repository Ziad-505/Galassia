import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart, Diamond } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
	const { cart } = useCartStore();

	return (
		<div className='py-8 md:py-16'>
			<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
				{/* Page Header */}
				<motion.div
					className='text-center mb-10'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className='flex items-center justify-center gap-3 mb-2'>
						<Diamond className='w-6 h-6 text-yellow-500' />
						<h1 className='font-galassia text-3xl text-gold-gradient'>Your Selection</h1>
						<Diamond className='w-6 h-6 text-yellow-500' />
					</div>
					<p className='font-elegant text-gray-400 italic'>
						{cart.length > 0 
							? `${cart.length} exquisite ${cart.length === 1 ? 'piece' : 'pieces'} awaiting you`
							: 'Your collection awaits'}
					</p>
				</motion.div>

				<div className='mt-6 sm:mt-8 md:gap-8 lg:flex lg:items-start xl:gap-10'>
					{/* Cart Items Section */}
					<motion.div
						className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className='space-y-4'>
								{cart.map((item, index) => (
									<motion.div
										key={item._id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: index * 0.1 }}
									>
										<CartItem item={item} />
									</motion.div>
								))}
							</div>
						)}
						{cart.length > 0 && <PeopleAlsoBought />}
					</motion.div>

					{/* Order Summary Section */}
					{cart.length > 0 && (
						<motion.div
							className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<OrderSummary />
							<GiftCouponCard />
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};
export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className='luxury-card flex flex-col items-center justify-center space-y-6 py-16 px-8'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='relative'>
			<ShoppingCart className='h-20 w-20 text-gray-600' />
			<Diamond className='h-8 w-8 text-yellow-500 absolute -top-2 -right-2 animate-pulse' />
		</div>
		
		<div className='text-center'>
			<h3 className='font-galassia text-2xl text-gold-gradient mb-2'>
				Your Bag is Empty
			</h3>
			<p className='font-elegant text-gray-400 text-lg'>
				Discover our exquisite collection and find your perfect piece
			</p>
		</div>
		
		<Link
			className='btn-gold rounded-md font-modern text-sm uppercase tracking-wider'
			to='/'
		>
			Explore Collections
		</Link>
	</motion.div>
);
