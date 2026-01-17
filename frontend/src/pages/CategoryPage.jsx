import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { Diamond } from "lucide-react";

const categoryDescriptions = {
	diamonds: "Timeless brilliance that captures the essence of eternal beauty",
	rings: "Symbols of love and commitment, crafted with precision",
	necklaces: "Elegant chains and pendants that grace every neckline",
	earrings: "From subtle studs to dramatic drops, perfect for every occasion",
	bracelets: "Delicate pieces that add grace to every gesture",
	gemstones: "Rare treasures from around the world, each with its own story",
};

const CategoryPage = () => {
	const { fetchProductsByCategory, products } = useProductStore();

	const { category } = useParams();

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	return (
		<div className='min-h-screen'>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				{/* Category Header */}
				<motion.div
					className='text-center mb-16'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<span className='w-12 h-px bg-gradient-to-r from-transparent to-yellow-600' />
						<Diamond className='w-6 h-6 text-yellow-500' />
						<span className='w-12 h-px bg-gradient-to-l from-transparent to-yellow-600' />
					</div>
					
					<h1 className='font-galassia text-4xl sm:text-5xl text-gold-gradient mb-4'>
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</h1>
					
					<p className='font-elegant text-xl text-gray-400 italic max-w-2xl mx-auto'>
						{categoryDescriptions[category] || "Discover our exquisite collection"}
					</p>
				</motion.div>

				{/* Products Grid */}
				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{products?.length === 0 && (
						<motion.div 
							className='col-span-full text-center py-16'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<Diamond className='w-16 h-16 text-gray-600 mx-auto mb-4' />
							<h2 className='font-galassia text-2xl text-gray-400 mb-2'>
								Coming Soon
							</h2>
							<p className='font-elegant text-gray-500 text-lg'>
								Our artisans are crafting new pieces for this collection
							</p>
						</motion.div>
					)}

					{products?.map((product, index) => (
						<motion.div
							key={product._id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<ProductCard product={product} />
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
};
export default CategoryPage;
