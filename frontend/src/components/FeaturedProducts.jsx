import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

	const { addToCart } = useCartStore();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className='py-12'>
			<div className='container mx-auto px-4'>
				{/* Section Header */}
				<div className='text-center mb-12'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='flex items-center justify-center gap-3 mb-4'
					>
						<Sparkles className='w-6 h-6 text-yellow-500' />
						<h2 className='font-galassia text-3xl sm:text-4xl text-gold-gradient'>
							Featured Pieces
						</h2>
						<Sparkles className='w-6 h-6 text-yellow-500' />
					</motion.div>
					<p className='font-elegant text-xl text-gray-400 italic'>
						Handpicked Treasures for the Exceptional
					</p>
				</div>

				{/* Carousel */}
				<div className='relative'>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-500 ease-out'
							style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
						>
							{featuredProducts?.map((product) => (
								<div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-3'>
									<motion.div 
										className='jewelry-card bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden h-full border border-yellow-700/20 group'
										whileHover={{ y: -5 }}
										transition={{ duration: 0.3 }}
									>
										{/* Featured Badge */}
										<div className='badge-featured rounded-tl-lg'>
											<Sparkles className='w-3 h-3 inline mr-1' />
											Featured
										</div>

										{/* Product Image */}
										<div className='overflow-hidden relative'>
											<img
												src={product.image}
												alt={product.name}
												className='w-full h-56 object-cover transition-transform duration-500 ease-out group-hover:scale-110'
											/>
											{/* Shimmer Overlay */}
											<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
												<div className='absolute inset-0 animate-shimmer' />
											</div>
										</div>

										{/* Product Info */}
										<div className='p-5'>
											<h3 className='font-elegant text-lg font-medium mb-2 text-white group-hover:text-yellow-400 transition-colors duration-300'>
												{product.name}
											</h3>
											<p className='price-tag mb-4'>
												${product.price.toFixed(2)}
											</p>
											<button
												onClick={() => addToCart(product)}
												className='w-full btn-gold rounded-md flex items-center justify-center gap-2 text-sm'
											>
												<ShoppingCart className='w-4 h-4' />
												Add to Bag
											</button>
										</div>
									</motion.div>
								</div>
							))}
						</div>
					</div>

					{/* Navigation Buttons */}
					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-2 sm:-left-4 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 border ${
							isStartDisabled 
								? "bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed" 
								: "bg-gray-900 border-yellow-700/50 text-yellow-500 hover:bg-yellow-700 hover:text-white hover:border-yellow-600"
						}`}
					>
						<ChevronLeft className='w-5 h-5' />
					</button>

					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 border ${
							isEndDisabled 
								? "bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed" 
								: "bg-gray-900 border-yellow-700/50 text-yellow-500 hover:bg-yellow-700 hover:text-white hover:border-yellow-600"
						}`}
					>
						<ChevronRight className='w-5 h-5' />
					</button>
				</div>

				{/* Progress Dots */}
				<div className='flex justify-center gap-2 mt-8'>
					{Array.from({ length: Math.ceil(featuredProducts.length / itemsPerPage) }).map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index * itemsPerPage)}
							className={`w-2 h-2 rounded-full transition-all duration-300 ${
								Math.floor(currentIndex / itemsPerPage) === index
									? 'w-8 bg-yellow-500'
									: 'bg-gray-600 hover:bg-gray-500'
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
export default FeaturedProducts;
