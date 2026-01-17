import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Calendar, DollarSign, User, Search, Filter, CheckCircle, MapPin, CreditCard, Banknote } from "lucide-react";
import axios from "../lib/axios";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";

const OrdersTab = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("newest");

	useEffect(() => {
		fetchAllOrders();
	}, []);

	const fetchAllOrders = async () => {
		try {
			const response = await axios.get("/orders/all");
			setOrders(response.data);
		} catch (error) {
			console.error("Error fetching orders:", error);
		} finally {
			setLoading(false);
		}
	};

	const filteredOrders = orders
		.filter(order => {
			const searchLower = searchTerm.toLowerCase();
			const orderId = order._id.slice(-8).toLowerCase();
			const userName = order.user?.name?.toLowerCase() || "";
			const userEmail = order.user?.email?.toLowerCase() || "";
			return orderId.includes(searchLower) || userName.includes(searchLower) || userEmail.includes(searchLower);
		})
		.sort((a, b) => {
			if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
			if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
			if (sortBy === "highest") return b.totalAmount - a.totalAmount;
			if (sortBy === "lowest") return a.totalAmount - b.totalAmount;
			return 0;
		});

	if (loading) return <LoadingSpinner />;

	return (
		<div className='max-w-screen-xl mx-auto'>
			{/* Header & Controls */}
			<motion.div
				className='luxury-card p-6 mb-6'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
					<div>
						<h2 className='font-galassia text-2xl text-gold-gradient mb-1'>Order Management</h2>
						<p className='font-elegant text-gray-400 text-sm'>
							Total: {orders.length} {orders.length === 1 ? 'order' : 'orders'}
						</p>
					</div>

					<div className='flex flex-col sm:flex-row gap-3'>
						{/* Search */}
						<div className='relative'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
							<input
								type='text'
								placeholder='Search orders...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white font-elegant text-sm
								focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all'
							/>
						</div>

						{/* Sort */}
						<div className='relative'>
							<Filter className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className='pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white font-elegant text-sm
								focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all appearance-none cursor-pointer'
							>
								<option value='newest'>Newest First</option>
								<option value='oldest'>Oldest First</option>
								<option value='highest'>Highest Amount</option>
								<option value='lowest'>Lowest Amount</option>
							</select>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Orders List */}
			{filteredOrders.length === 0 ? (
				<motion.div
					className='luxury-card p-12 text-center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<Package className='w-16 h-16 text-gray-600 mx-auto mb-4' />
					<p className='font-elegant text-gray-400 text-lg'>
						{searchTerm ? 'No orders found matching your search' : 'No orders yet'}
					</p>
				</motion.div>
			) : (
				<div className='space-y-4'>
					{filteredOrders.map((order, index) => (
						<OrderCard key={order._id} order={order} index={index} onStatusUpdate={fetchAllOrders} />
					))}
				</div>
			)}
		</div>
	);
};

const OrderCard = ({ order, index, onStatusUpdate }) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [currentStatus, setCurrentStatus] = useState(order.status || "pending");

	const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});

	const handleStatusChange = async (newStatus) => {
		setIsUpdating(true);
		try {
			await axios.patch(`/orders/status/${order._id}`, { status: newStatus });
			setCurrentStatus(newStatus);
			toast.success("Order status updated successfully!");
			onStatusUpdate(); // Refresh orders list
		} catch (error) {
			console.error("Error updating order status:", error);
			toast.error(error.response?.data?.message || "Failed to update order status");
		} finally {
			setIsUpdating(false);
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "pending": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
			case "processing": return "bg-blue-500/20 text-blue-500 border-blue-500/50";
			case "shipped": return "bg-purple-500/20 text-purple-500 border-purple-500/50";
			case "delivered": return "bg-green-500/20 text-green-500 border-green-500/50";
			case "cancelled": return "bg-red-500/20 text-red-500 border-red-500/50";
			default: return "bg-gray-500/20 text-gray-500 border-gray-500/50";
		}
	};

	return (
		<motion.div
			className='luxury-card p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.05 }}
		>
			{/* Order Header */}
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-4 border-b border-gray-700'>
				{/* Order ID */}
				<div>
					<div className='flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1'>
						<Package className='w-3 h-3' />
						<span>Order ID</span>
					</div>
					<p className='font-galassia text-lg text-gold-gradient'>
						#{order._id.slice(-8).toUpperCase()}
					</p>
				</div>

				{/* Customer */}
				<div>
					<div className='flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1'>
						<User className='w-3 h-3' />
						<span>Customer</span>
					</div>
					<p className='font-elegant text-white'>{order.user?.name || 'N/A'}</p>
					<p className='font-elegant text-gray-400 text-sm'>{order.user?.email || 'N/A'}</p>
				</div>

				{/* Order Status */}
				<div>
					<div className='flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1'>
						<CheckCircle className='w-3 h-3' />
						<span>Status</span>
					</div>
					<select
						value={currentStatus}
						onChange={(e) => handleStatusChange(e.target.value)}
						disabled={isUpdating}
						className={`w-full px-3 py-1.5 rounded-md border font-elegant text-sm capitalize cursor-pointer
							transition-all ${getStatusColor(currentStatus)}
							focus:ring-2 focus:ring-yellow-600/50 focus:border-yellow-600
							disabled:opacity-50 disabled:cursor-not-allowed`}
					>
						<option value="pending">Pending</option>
						<option value="processing">Processing</option>
						<option value="shipped">Shipped</option>
						<option value="delivered">Delivered</option>
						<option value="cancelled">Cancelled</option>
					</select>
				</div>

				{/* Date & Total */}
				<div className='md:text-right'>
					<div className='flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1 md:justify-end'>
						<Calendar className='w-3 h-3' />
						<span>Date</span>
					</div>
					<p className='font-elegant text-white text-sm mb-2'>{orderDate}</p>
					<div className='flex items-center gap-2 md:justify-end'>
						<DollarSign className='w-5 h-5 text-yellow-500' />
						<span className='font-galassia text-2xl text-gold-gradient'>
							${order.totalAmount.toFixed(2)}
						</span>
					</div>
				</div>
			</div>

			{/* Order Items */}
			<div>
				<h4 className='font-modern text-xs text-gray-400 uppercase tracking-wider mb-3'>
					Items ({order.products.length})
				</h4>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
					{order.products.map((item) => (
						<div 
							key={item._id} 
							className='flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg'
						>
							{item.product?.image && (
								<img 
									src={item.product.image} 
									alt={item.product?.name || 'Product'} 
									className='w-12 h-12 object-cover rounded'
								/>
							)}
							<div className='flex-1 min-w-0'>
								<p className='font-elegant text-white text-sm truncate'>
									{item.product?.name || 'Product'}
								</p>
								<p className='text-xs text-gray-400'>
									Qty: {item.quantity} × ${item.price.toFixed(2)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Shipping Address & Payment Method */}
			{order.shippingAddress && (
				<div className='pt-4 border-t border-gray-700'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Shipping Address */}
						<div>
							<h4 className='flex items-center gap-2 font-modern text-xs text-gray-400 uppercase tracking-wider mb-2'>
								<MapPin className='w-3 h-3' />
								Shipping Address
							</h4>
							<div className='bg-gray-800/30 p-3 rounded-lg'>
								<p className='font-elegant text-white text-sm mb-1'>{order.shippingAddress.name}</p>
								<p className='font-elegant text-gray-400 text-xs'>{order.shippingAddress.phone}</p>
								<p className='font-elegant text-gray-400 text-xs mt-2'>
									{order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.zipCode}
								</p>
							</div>
						</div>

						{/* Payment Method */}
						<div>
							<h4 className='flex items-center gap-2 font-modern text-xs text-gray-400 uppercase tracking-wider mb-2'>
								Payment Method
							</h4>
							<div className='bg-gray-800/30 p-3 rounded-lg flex items-center gap-3'>
								{order.paymentMethod === "cash" ? (
									<>
										<Banknote className='w-8 h-8 text-yellow-500' />
										<div>
											<p className='font-elegant text-white text-sm'>Cash on Delivery</p>
											<p className='font-elegant text-gray-400 text-xs'>Pay when you receive</p>
										</div>
									</>
								) : (
									<>
										<CreditCard className='w-8 h-8 text-yellow-500' />
										<div>
											<p className='font-elegant text-white text-sm'>Card Payment</p>
											<p className='font-elegant text-gray-400 text-xs'>Paid online</p>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default OrdersTab;
