import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	const hasDiscount = item.discount > 0;
	const discountedPrice = hasDiscount ? item.price * (1 - item.discount / 100) : item.price;
	const totalPrice = (discountedPrice * item.quantity).toFixed(2);

	return (
		<div className='luxury-card p-4 md:p-6'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				{/* Product Image */}
				<div className='shrink-0 md:order-1'>
					<img 
						className='h-24 w-24 md:h-32 md:w-32 rounded-lg object-cover border border-yellow-700/20' 
						src={item.image}
						alt={item.name}
					/>
				</div>

				{/* Quantity Controls */}
				<div className='flex items-center justify-between md:order-3 md:justify-end'>
					<div className='flex items-center gap-3'>
						<button
							className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border
							 border-gray-700 bg-gray-800 hover:bg-gray-700 hover:border-yellow-700/50 focus:outline-none focus:ring-2
							  focus:ring-yellow-600/50 transition-all duration-200'
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
						>
							<Minus className='w-4 h-4 text-gray-300' />
						</button>
						<span className='font-modern text-white w-8 text-center'>{item.quantity}</span>
						<button
							className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border
							 border-gray-700 bg-gray-800 hover:bg-gray-700 hover:border-yellow-700/50 focus:outline-none 
							focus:ring-2 focus:ring-yellow-600/50 transition-all duration-200'
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
						>
							<Plus className='w-4 h-4 text-gray-300' />
						</button>
					</div>

					<div className='text-end md:order-4 md:w-32 ml-4'>
						{hasDiscount ? (
							<div>
								<p className='text-gray-500 line-through text-sm'>${item.price.toFixed(2)}</p>
								<p className='price-tag text-xl'>${discountedPrice.toFixed(2)}</p>
								<span className='text-xs text-yellow-500 font-elegant'>-{item.discount}%</span>
							</div>
						) : (
							<p className='price-tag text-xl'>${item.price.toFixed(2)}</p>
						)}
					</div>
				</div>

				{/* Product Info */}
				<div className='w-full min-w-0 flex-1 space-y-3 md:order-2 md:max-w-md'>
					<h3 className='font-elegant text-lg text-white hover:text-yellow-400 transition-colors duration-200'>
						{item.name}
					</h3>
					{item.description && (
						<p className='font-modern text-sm text-gray-500 line-clamp-2'>{item.description}</p>
					)}

					<button
						className='inline-flex items-center gap-2 font-modern text-xs text-red-400
						 hover:text-red-300 uppercase tracking-wider transition-colors duration-200'
						onClick={() => removeFromCart(item._id)}
					>
						<Trash className='w-4 h-4' />
						Remove
					</button>
				</div>
			</div>
		</div>
	);
};
export default CartItem;
