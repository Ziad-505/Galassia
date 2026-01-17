import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, User, Phone, Home, Building } from "lucide-react";

const AddressModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		address: "",
		city: "",
		zipCode: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors(prev => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
		else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
		if (!formData.address.trim()) newErrors.address = "Address is required";
		if (!formData.city.trim()) newErrors.city = "City is required";
		if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			onSubmit(formData);
		}
	};

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
				{/* Backdrop */}
				<motion.div
					className='absolute inset-0 bg-black/80'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				/>

				{/* Modal */}
				<motion.div
					className='relative luxury-card w-full max-w-md max-h-[90vh] overflow-y-auto'
					initial={{ opacity: 0, scale: 0.9, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.9, y: 20 }}
					transition={{ duration: 0.3 }}
				>
					{/* Header */}
					<div className='sticky top-0 bg-gray-900/95 backdrop-blur-sm p-6 pb-4 border-b border-gray-700 z-10'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<MapPin className='w-6 h-6 text-yellow-500' />
								<h2 className='font-galassia text-2xl text-gold-gradient'>Shipping Address</h2>
							</div>
							<button
								onClick={onClose}
								className='p-2 hover:bg-gray-800 rounded-lg transition-colors'
								disabled={isSubmitting}
							>
								<X className='w-5 h-5 text-gray-400' />
							</button>
						</div>
						<p className='font-elegant text-sm text-gray-400 mt-2'>
							Please provide your delivery information
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className='p-6 space-y-4'>
						{/* Full Name */}
						<div>
							<label className='block font-modern text-sm text-gray-300 mb-2 uppercase tracking-wider'>
								<User className='w-4 h-4 inline mr-2' />
								Full Name *
							</label>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								className={`w-full px-4 py-2.5 bg-gray-800/50 border rounded-lg text-white font-elegant
									focus:ring-2 focus:ring-yellow-600/50 focus:border-yellow-600 transition-all
									${errors.name ? 'border-red-500' : 'border-gray-700'}`}
								placeholder='John Doe'
								disabled={isSubmitting}
							/>
							{errors.name && <p className='text-red-400 text-xs mt-1 font-elegant'>{errors.name}</p>}
						</div>

						{/* Phone Number */}
						<div>
							<label className='block font-modern text-sm text-gray-300 mb-2 uppercase tracking-wider'>
								<Phone className='w-4 h-4 inline mr-2' />
								Phone Number *
							</label>
							<input
								type='tel'
								name='phone'
								value={formData.phone}
								onChange={handleChange}
								className={`w-full px-4 py-2.5 bg-gray-800/50 border rounded-lg text-white font-elegant
									focus:ring-2 focus:ring-yellow-600/50 focus:border-yellow-600 transition-all
									${errors.phone ? 'border-red-500' : 'border-gray-700'}`}
								placeholder='+1 (555) 123-4567'
								disabled={isSubmitting}
							/>
							{errors.phone && <p className='text-red-400 text-xs mt-1 font-elegant'>{errors.phone}</p>}
						</div>

						{/* Street Address */}
						<div>
							<label className='block font-modern text-sm text-gray-300 mb-2 uppercase tracking-wider'>
								<Home className='w-4 h-4 inline mr-2' />
								Street Address *
							</label>
							<input
								type='text'
								name='address'
								value={formData.address}
								onChange={handleChange}
								className={`w-full px-4 py-2.5 bg-gray-800/50 border rounded-lg text-white font-elegant
									focus:ring-2 focus:ring-yellow-600/50 focus:border-yellow-600 transition-all
									${errors.address ? 'border-red-500' : 'border-gray-700'}`}
								placeholder='123 Main Street, Apt 4B'
								disabled={isSubmitting}
							/>
							{errors.address && <p className='text-red-400 text-xs mt-1 font-elegant'>{errors.address}</p>}
						</div>

						{/* City and Zip Code */}
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block font-modern text-sm text-gray-300 mb-2 uppercase tracking-wider'>
									<Building className='w-4 h-4 inline mr-2' />
									City *
								</label>
								<input
									type='text'
									name='city'
									value={formData.city}
									onChange={handleChange}
									className={`w-full px-4 py-2.5 bg-gray-800/50 border rounded-lg text-white font-elegant
										focus:ring-2 focus:ring-yellow-600/50 focus:border-yellow-600 transition-all
										${errors.city ? 'border-red-500' : 'border-gray-700'}`}
									placeholder='New York'
									disabled={isSubmitting}
								/>
								{errors.city && <p className='text-red-400 text-xs mt-1 font-elegant'>{errors.city}</p>}
							</div>

							<div>
								<label className='block font-modern text-sm text-gray-300 mb-2 uppercase tracking-wider'>
									Zip Code *
								</label>
								<input
									type='text'
									name='zipCode'
									value={formData.zipCode}
									onChange={handleChange}
									className={`w-full px-4 py-2.5 bg-gray-800/50 border rounded-lg text-white font-elegant
										focus:ring-2 focus:ring-yellow-600/50 focus:border-yellow-600 transition-all
										${errors.zipCode ? 'border-red-500' : 'border-gray-700'}`}
									placeholder='10001'
									disabled={isSubmitting}
								/>
								{errors.zipCode && <p className='text-red-400 text-xs mt-1 font-elegant'>{errors.zipCode}</p>}
							</div>
						</div>

						{/* Buttons */}
						<div className='flex gap-3 pt-4'>
							<button
								type='button'
								onClick={onClose}
								className='flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg
									font-modern text-sm uppercase tracking-wider transition-colors'
								disabled={isSubmitting}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='flex-1 btn-gold rounded-lg font-modern text-sm uppercase tracking-wider
									disabled:opacity-50 disabled:cursor-not-allowed'
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Processing...' : 'Confirm Order'}
							</button>
						</div>
					</form>
				</motion.div>
			</div>
		</AnimatePresence>
	);
};

export default AddressModal;
