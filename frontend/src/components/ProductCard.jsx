import toast from "react-hot-toast";
import { ShoppingCart, Sparkles } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	
	// If quantity is undefined (old products), assume it's in stock
	const quantity = product.quantity !== undefined ? product.quantity : 999;
	const isSoldOut = quantity === 0;
	const discount = product.discount || 0;
	const discountedPrice = discount > 0 ? product.price * (1 - discount / 100) : product.price;
	
	const handleAddToCart = (e) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		
		console.log('handleAddToCart called', { 
			user: user?.email, 
			product: product.name,
			isSoldOut,
			quantity 
		});
		
		if (!user) {
			toast.error("Please sign in to add items to your bag", { id: "login" });
			return;
		} 
		if (isSoldOut) {
			toast.error("This item is currently sold out", { id: "sold-out" });
			return;
		}
		addToCart(product);
	};

	return (
		<motion.div 
			className='jewelry-card flex w-full relative flex-col overflow-hidden rounded-lg border border-yellow-700/20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 group'
			whileHover={{ y: -5 }}
			transition={{ duration: 0.3 }}
			style={{ pointerEvents: 'auto' }}
		>
			{/* Product Image */}
			<div className='relative mx-3 mt-3 overflow-hidden rounded-lg'>
				<img 
					className='object-cover w-full h-64 transition-transform duration-500 ease-out group-hover:scale-110' 
					src={product.image} 
					alt={product.name} 
				/>
				{/* Sold Out Badge */}
				{isSoldOut && (
					<div className='absolute inset-0 bg-black/70 flex items-center justify-center'>
						<span className='bg-red-600 text-white font-modern text-sm uppercase tracking-wider px-6 py-2 rounded-md'>
							Sold Out
						</span>
					</div>
				)}
				{/* Discount Badge */}
				{discount > 0 && !isSoldOut && (
					<div className='absolute top-3 left-3 bg-red-600 text-white font-modern text-sm font-bold px-3 py-1 rounded-md'>
						-{discount}%
					</div>
				)}
				{/* Shimmer Overlay */}
				<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
					<div className='absolute inset-0 animate-shimmer' />
				</div>
				{/* Gradient Overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
			</div>

			{/* Product Info */}
			<div className='mt-4 px-5 pb-5 relative z-10'>
				{/* Product Name */}
				<h5 className='font-elegant text-xl text-white group-hover:text-yellow-400 transition-colors duration-300 mb-1'>
					{product.name}
				</h5>
				
				{/* Product Description (if available) */}
				{product.description && (
					<p className='font-modern text-xs text-gray-500 line-clamp-2 mb-3'>
						{product.description}
					</p>
				)}
				
				{/* Price */}
				<div className='flex items-center justify-between mb-4'>
					<div className='flex flex-col'>
						{discount > 0 ? (
							<>
								<span className='text-gray-400 line-through font-elegant text-sm'>
									${product.price.toFixed(2)}
								</span>
								<span className='price-tag text-2xl'>
									${discountedPrice.toFixed(2)}
								</span>
							</>
						) : (
							<span className='price-tag text-2xl'>
								${product.price.toFixed(2)}
							</span>
						)}
					</div>
					{product.isFeatured && (
						<span className='flex items-center gap-1 text-yellow-500'>
							<Sparkles className='w-4 h-4' />
							<span className='font-modern text-xs uppercase tracking-wider'>Featured</span>
						</span>
					)}
				</div>
				
				{/* Add to Cart Button */}
				<button
					className={`w-full rounded-md flex items-center justify-center gap-2 text-sm relative z-20 ${
						isSoldOut 
							? 'bg-gray-700 text-gray-400 cursor-not-allowed px-6 py-3' 
							: 'btn-gold cursor-pointer'
					}`}
					onClick={handleAddToCart}
					disabled={isSoldOut}
					type="button"
				>
					<ShoppingCart size={18} />
					<span className='font-modern uppercase tracking-wider'>
						{isSoldOut ? 'Sold Out' : 'Add to Bag'}
					</span>
				</button>
			</div>

			{/* Corner Accents */}
			<div className='absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none z-0'>
				<div className='absolute top-3 right-3 w-6 h-6 border-t border-r border-yellow-600/30 group-hover:border-yellow-500/60 transition-all duration-500 rounded-tr-lg' />
			</div>
		</motion.div>
	);
};
export default ProductCard;
