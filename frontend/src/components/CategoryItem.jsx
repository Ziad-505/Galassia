import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryItem = ({ category }) => {
	return (
		<Link to={"/category" + category.href}>
			<motion.div 
				className='jewelry-card relative overflow-hidden h-96 w-full rounded-lg group cursor-pointer border border-yellow-700/20'
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.3 }}
			>
				{/* Background Image */}
				<div className='absolute inset-0'>
					<img
						src={category.imageUrl}
						alt={category.name}
						className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
						loading='lazy'
					/>
				</div>
				
				{/* Gradient Overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500' />
				
				{/* Shimmer Effect on Hover */}
				<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
					<div className='absolute inset-0 animate-shimmer' />
				</div>

				{/* Gold Border Glow on Hover */}
				<div className='absolute inset-0 border-2 border-transparent group-hover:border-yellow-600/40 rounded-lg transition-all duration-500' />
				
				{/* Content */}
				<div className='absolute bottom-0 left-0 right-0 p-6 z-20'>
					{/* Decorative Diamond */}
					<div className='mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0'>
						<span className='inline-block w-2 h-2 bg-yellow-500 rotate-45' />
					</div>
					
					{/* Category Name */}
					<h3 className='font-galassia text-white text-2xl mb-2 tracking-wider group-hover:text-gold-gradient transition-all duration-300'>
						{category.name}
					</h3>
					
					{/* Description */}
					<p className='font-elegant text-gray-300 text-lg italic opacity-80 group-hover:opacity-100 transition-opacity duration-300'>
						{category.description}
					</p>
					
					{/* Explore Link */}
					<div className='mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500'>
						<span className='font-modern text-yellow-500 text-sm uppercase tracking-widest'>
							Explore Collection
						</span>
						<svg 
							className='w-4 h-4 text-yellow-500 transform group-hover:translate-x-2 transition-transform duration-300' 
							fill='none' 
							stroke='currentColor' 
							viewBox='0 0 24 24'
						>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
						</svg>
					</div>
				</div>

				{/* Corner Accent */}
				<div className='absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-yellow-600/30 group-hover:border-yellow-500/60 transition-all duration-500 rounded-tr-lg' />
				<div className='absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-yellow-600/30 group-hover:border-yellow-500/60 transition-all duration-500 rounded-bl-lg' />
			</motion.div>
		</Link>
	);
};

export default CategoryItem;
