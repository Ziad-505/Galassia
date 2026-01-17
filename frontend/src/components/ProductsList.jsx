import { motion } from "framer-motion";
import { Trash, Star, Diamond, Edit2, Save, X } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useState } from "react";
import toast from "react-hot-toast";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products, updateProduct } = useProductStore();
	const [editingId, setEditingId] = useState(null);
	const [editForm, setEditForm] = useState({});

	const startEdit = (product) => {
		setEditingId(product._id);
		setEditForm({
			price: product.price || 0,
			quantity: product.quantity || 0,
			discount: product.discount || 0
		});
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditForm({});
	};

	const saveEdit = async (productId) => {
		try {
			await updateProduct(productId, editForm);
			setEditingId(null);
			setEditForm({});
			toast.success("Product updated successfully");
		} catch (error) {
			toast.error("Failed to update product");
		}
	};

	return (
		<motion.div
			className='luxury-card overflow-hidden max-w-5xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			{/* Header */}
			<div className='p-6 border-b border-yellow-700/20'>
				<div className='flex items-center gap-3'>
					<Diamond className='w-5 h-5 text-yellow-500' />
					<h2 className='font-galassia text-xl text-gold-gradient'>Collection Inventory</h2>
				</div>
			</div>

			{/* Table */}
			<div className='overflow-x-auto'>
				<table className='min-w-full'>
					<thead className='bg-gray-800/50'>
						<tr>
							<th
								scope='col'
								className='px-6 py-4 text-left font-modern text-xs text-gray-400 uppercase tracking-wider'
							>
								Piece
							</th>
							<th
								scope='col'
								className='px-6 py-4 text-left font-modern text-xs text-gray-400 uppercase tracking-wider'
							>
								Price
							</th>
							<th
								scope='col'
								className='px-6 py-4 text-left font-modern text-xs text-gray-400 uppercase tracking-wider'
							>
								Stock
							</th>
							<th
								scope='col'
								className='px-6 py-4 text-left font-modern text-xs text-gray-400 uppercase tracking-wider'
							>
								Discount
							</th>
							<th
								scope='col'
								className='px-6 py-4 text-left font-modern text-xs text-gray-400 uppercase tracking-wider'
							>
								Collection
							</th>
							<th
								scope='col'
								className='px-6 py-4 text-left font-modern text-xs text-gray-400 uppercase tracking-wider'
							>
								Featured
							</th>
							<th
								scope='col'
								className='px-6 py-4 text-left font-modern text-xs text-gray-400 uppercase tracking-wider'
							>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-800'>
						{products?.map((product, index) => (
							<motion.tr 
								key={product._id} 
								className='hover:bg-gray-800/30 transition-colors duration-200'
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.3, delay: index * 0.05 }}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-12 w-12'>
											<img
												className='h-12 w-12 rounded-lg object-cover border border-yellow-700/30'
												src={product.image}
												alt={product.name}
											/>
										</div>
										<div className='ml-4'>
											<div className='font-elegant text-white'>{product.name}</div>
										</div>
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{editingId === product._id ? (
										<input
											type='number'
											value={editForm.price || ''}
											onChange={(e) => setEditForm({...editForm, price: parseFloat(e.target.value) || 0})}
											className='w-20 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm'
											min='0'
											step='0.01'
										/>
									) : (
										<div className='price-tag text-lg'>${(product.price || 0).toFixed(2)}</div>
									)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{editingId === product._id ? (
										<input
											type='number'
											value={editForm.quantity || ''}
											onChange={(e) => setEditForm({...editForm, quantity: parseInt(e.target.value) || 0})}
											className='w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm'
											min='0'
										/>
									) : (
										<span className={`font-modern text-sm ${(product.quantity || 0) === 0 ? 'text-red-400' : 'text-gray-300'}`}>
											{product.quantity || 0} {(product.quantity || 0) === 0 && '(Sold Out)'}
										</span>
									)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{editingId === product._id ? (
										<input
											type='number'
											value={editForm.discount || ''}
											onChange={(e) => setEditForm({...editForm, discount: parseInt(e.target.value) || 0})}
											className='w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm'
											min='0'
											max='100'
										/>
									) : (
										<span className='font-modern text-sm text-gray-300'>
											{product.discount || 0}%
										</span>
									)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='font-modern text-sm text-gray-300 capitalize px-3 py-1 bg-gray-800 rounded-full border border-gray-700'>
										{product.category}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => toggleFeaturedProduct(product._id)}
										className={`p-2 rounded-full transition-all duration-300 ${
											product.isFeatured 
												? "bg-yellow-600 text-gray-900 shadow-lg shadow-yellow-600/30" 
												: "bg-gray-700 text-gray-400 hover:bg-gray-600"
										}`}
									>
										<Star className={`h-4 w-4 ${product.isFeatured ? 'fill-current' : ''}`} />
									</button>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center gap-2'>
										{editingId === product._id ? (
											<>
												<button
													onClick={() => saveEdit(product._id)}
													className='p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-all duration-200'
													title='Save'
												>
													<Save className='h-4 w-4' />
												</button>
												<button
													onClick={cancelEdit}
													className='p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-500/10 rounded-lg transition-all duration-200'
													title='Cancel'
												>
													<X className='h-4 w-4' />
												</button>
											</>
										) : (
											<>
												<button
													onClick={() => startEdit(product)}
													className='p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-200'
													title='Edit'
												>
													<Edit2 className='h-4 w-4' />
												</button>
												<button
													onClick={() => deleteProduct(product._id)}
													className='p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200'
													title='Delete'
												>
													<Trash className='h-4 w-4' />
												</button>
											</>
										)}
									</div>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Empty State */}
			{products?.length === 0 && (
				<div className='p-12 text-center'>
					<Diamond className='w-12 h-12 text-gray-600 mx-auto mb-4' />
					<p className='font-elegant text-gray-400 text-lg'>No pieces in the collection yet</p>
					<p className='font-modern text-gray-500 text-sm mt-2'>Add your first jewelry piece to get started</p>
				</div>
			)}
		</motion.div>
	);
};
export default ProductsList;
