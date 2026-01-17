import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, Diamond } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["diamonds", "rings", "necklaces", "earrings", "bracelets", "gemstones"];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
		quantity: "",
		discount: "",
	});

	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "", quantity: "", discount: "" });
		} catch {
			console.log("error creating a product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};

	return (
		<motion.div
			className='luxury-card p-8 mb-8 max-w-xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className='flex items-center gap-3 mb-6'>
				<Diamond className='w-6 h-6 text-yellow-500' />
				<h2 className='font-galassia text-2xl text-gold-gradient'>Add New Piece</h2>
			</div>

			<form onSubmit={handleSubmit} className='space-y-5'>
				<div>
					<label htmlFor='name' className='block font-modern text-sm text-gray-300 mb-2 uppercase tracking-wider'>
						Piece Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className='w-full bg-gray-800/50 border border-gray-700 rounded-md py-3 px-4 text-white font-elegant
						 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all duration-300'
						placeholder='e.g., Eternal Diamond Solitaire'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='block font-modern text-sm text-gray-300 mb-2 uppercase tracking-wider'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows='3'
						className='w-full bg-gray-800/50 border border-gray-700 rounded-md py-3 px-4 text-white font-elegant
						 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all duration-300'
						placeholder='Describe the beauty and craftsmanship of this piece...'
						required
					/>
				</div>

				<div>
					<label htmlFor='price' className='block font-modern text-sm text-gray-300 mb-2 uppercase tracking-wider'>
						Price (USD)
					</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						step='0.01'
						className='w-full bg-gray-800/50 border border-gray-700 rounded-md py-3 px-4 text-white font-elegant
						 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all duration-300'
						placeholder='0.00'
						required
					/>
				</div>

				<div>
					<label htmlFor='category' className='block font-modern text-sm text-gray-300 mb-2 uppercase tracking-wider'>
						Collection
					</label>
					<select
						id='category'
						name='category'
						value={newProduct.category}
						onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
						className='w-full bg-gray-800/50 border border-gray-700 rounded-md py-3 px-4 text-white font-elegant
						 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all duration-300 appearance-none cursor-pointer'
						required
					>
						<option value=''>Select a collection</option>
						{categories.map((category) => (
							<option key={category} value={category} className='bg-gray-800'>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</option>
						))}
					</select>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label htmlFor='quantity' className='block font-modern text-sm text-gray-300 mb-2 uppercase tracking-wider'>
							Quantity in Stock
						</label>
						<input
							type='number'
							id='quantity'
							name='quantity'
							value={newProduct.quantity}
							onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
							min='0'
							className='w-full bg-gray-800/50 border border-gray-700 rounded-md py-3 px-4 text-white font-elegant
							 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all duration-300'
							placeholder='0'
							required
						/>
					</div>

					<div>
						<label htmlFor='discount' className='block font-modern text-sm text-gray-300 mb-2 uppercase tracking-wider'>
							Discount (%)
						</label>
						<input
							type='number'
							id='discount'
							name='discount'
							value={newProduct.discount}
							onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
							min='0'
							max='100'
							className='w-full bg-gray-800/50 border border-gray-700 rounded-md py-3 px-4 text-white font-elegant
							 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all duration-300'
							placeholder='0'
						/>
					</div>
				</div>

				<div>
					<label className='block font-modern text-sm text-gray-300 mb-2 uppercase tracking-wider'>
						Product Image
					</label>
					<div className='flex items-center gap-4'>
						<input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
						<label
							htmlFor='image'
							className='cursor-pointer bg-gray-800/50 py-3 px-5 border border-gray-700 rounded-md text-sm font-modern text-gray-300 
							hover:bg-gray-700 hover:border-yellow-700/50 focus:outline-none transition-all duration-300 flex items-center gap-2'
						>
							<Upload className='h-4 w-4' />
							Upload Image
						</label>
						{newProduct.image && (
							<span className='text-sm text-yellow-500 font-modern flex items-center gap-2'>
								<span className='w-2 h-2 bg-yellow-500 rounded-full animate-pulse' />
								Image ready
							</span>
						)}
					</div>
				</div>

				<button
					type='submit'
					className='w-full btn-gold rounded-md flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='h-5 w-5 animate-spin' aria-hidden='true' />
							<span className='font-modern text-sm uppercase tracking-wider'>Creating...</span>
						</>
					) : (
						<>
							<PlusCircle className='h-5 w-5' />
							<span className='font-modern text-sm uppercase tracking-wider'>Add to Collection</span>
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};
export default CreateProductForm;
