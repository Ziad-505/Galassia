import { useEffect } from "react";
import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/diamonds", name: "Diamonds", imageUrl: "/diamonds.svg", description: "Timeless Brilliance" },
	{ href: "/rings", name: "Rings", imageUrl: "/rings.svg", description: "Symbol of Love" },
	{ href: "/necklaces", name: "Necklaces", imageUrl: "/necklaces.svg", description: "Elegant Chains" },
	{ href: "/earrings", name: "Earrings", imageUrl: "/earrings.svg", description: "Radiant Beauty" },
	{ href: "/bracelets", name: "Bracelets", imageUrl: "/bracelets.svg", description: "Graceful Wrists" },
	{ href: "/gemstones", name: "Gemstones", imageUrl: "/gemstones.svg", description: "Rare Treasures" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			{/* Hero Section */}
			<section className='relative py-24 sm:py-32 px-4 sm:px-6'>
				<div className='max-w-7xl mx-auto text-center'>
					{/* Animated Logo */}
					<motion.div
						initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
						animate={{ opacity: 1, scale: 1, rotateY: 360 }}
						transition={{ duration: 1.5, ease: "easeOut" }}
						className='mb-4'
					>
						<img 
							src='/Logo.png' 
							alt='Galassia Logo' 
							className='w-40 h-40 sm:w-48 sm:h-48 mx-auto brightness-125'
						/>
					</motion.div>

					{/* Main Title */}
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className='font-galassia text-5xl sm:text-6xl lg:text-8xl text-gold-gradient mb-8'
					>
						Galassia
					</motion.h1>

					{/* Tagline */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.5 }}
						className='font-elegant text-2xl sm:text-3xl lg:text-4xl text-gray-300 mb-6 italic'
					>
						Where Every Gem Tells a Story
					</motion.p>

					{/* Subtitle */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.7 }}
						className='font-modern text-gray-400 text-base sm:text-lg max-w-3xl mx-auto mb-16 leading-relaxed px-4'
					>
						Discover our exquisite collection of handcrafted jewelry and rare gemstones, 
						each piece a masterwork of Italian craftsmanship and timeless elegance.
					</motion.p>

					{/* Decorative Divider */}
					<motion.div
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 1, delay: 0.9 }}
						className='elegant-divider max-w-lg mx-auto mb-8'
					/>
				</div>
			</section>

			{/* Collections Section */}
			<section className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className='text-center mb-20'
				>
					<h2 className='font-galassia text-4xl sm:text-5xl lg:text-6xl text-gold-gradient mb-6'>
						Our Collections
					</h2>
					<p className='font-elegant text-xl sm:text-2xl text-gray-400 italic'>
						Curated for the Discerning Connoisseur
					</p>
				</motion.div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10'>
					{categories.map((category, index) => (
						<motion.div
							key={category.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<CategoryItem category={category} />
						</motion.div>
					))}
				</div>
			</section>

			{/* Featured Products Section */}
			{!isLoading && products.length > 0 && (
				<section className='py-20 sm:py-24'>
					<FeaturedProducts featuredProducts={products} />
				</section>
			)}

			{/* Elegant Footer CTA */}
			<section className='py-24 sm:py-32 px-4 sm:px-6'>
				<div className='max-w-5xl mx-auto text-center'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className='luxury-card p-10 sm:p-16'
					>
						<h3 className='font-galassia text-3xl sm:text-4xl lg:text-5xl text-gold-gradient mb-6'>
							The Art of Luxury
						</h3>
						<p className='font-elegant text-lg sm:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed'>
							Each piece in our collection is meticulously crafted by master artisans, 
							combining centuries-old techniques with contemporary design to create 
							jewelry that transcends time.
						</p>
						<div className='flex flex-wrap justify-center gap-6 sm:gap-8'>
							<div className='flex items-center gap-3 text-gray-400'>
								<span className='w-2.5 h-2.5 bg-yellow-500 rotate-45' />
								<span className='font-modern text-sm sm:text-base uppercase tracking-wider'>Certified Diamonds</span>
							</div>
							<div className='flex items-center gap-3 text-gray-400'>
								<span className='w-2.5 h-2.5 bg-yellow-500 rotate-45' />
								<span className='font-modern text-sm sm:text-base uppercase tracking-wider'>Lifetime Warranty</span>
							</div>
							<div className='flex items-center gap-3 text-gray-400'>
								<span className='w-2.5 h-2.5 bg-yellow-500 rotate-45' />
								<span className='font-modern text-sm sm:text-base uppercase tracking-wider'>Free Shipping</span>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};
export default HomePage;
