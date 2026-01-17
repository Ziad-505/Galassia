import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Calendar, DollarSign, ShoppingBag, Diamond, CheckCircle, MapPin, CreditCard, Banknote } from "lucide-react";
import axios from "../lib/axios";
import LoadingSpinner from "../components/LoadingSpinner";

const OrderHistoryPage = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async () => {
		try {
			const response = await axios.get("/orders/my-orders");
			setOrders(response.data);
		} catch (error) {
			console.error("Error fetching orders:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <LoadingSpinner />;

	return (
		<div className='min-h-screen py-8 md:py-16'>
			<div className='max-w-screen-xl mx-auto px-4'>
				{/* Page Header */}
				<motion.div
					className='text-center mb-10'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className='flex items-center justify-center gap-3 mb-2'>
						<Package className='w-6 h-6 text-yellow-500' />
						<h1 className='font-galassia text-3xl md:text-4xl text-gold-gradient'>Order History</h1>
						<Package className='w-6 h-6 text-yellow-500' />
					</div>
					<p className='font-elegant text-gray-400 italic'>
						{orders.length > 0 
							? `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} placed`
							: 'No orders yet'}
					</p>
				</motion.div>

				{/* Orders List */}
				{orders.length === 0 ? (
					<EmptyOrdersUI />
				) : (
					<div className='space-y-6'>
						{orders.map((order, index) => (
							<OrderCard key={order._id} order={order} index={index} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

const OrderCard = ({ order, index }) => {
	const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

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
			transition={{ duration: 0.5, delay: index * 0.1 }}
		>
			{/* Order Header */}
			<div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4 border-b border-gray-700'>
				<div className='mb-4 md:mb-0'>
					<h3 className='font-galassia text-xl text-gold-gradient mb-2'>
						Order #{order._id.slice(-8).toUpperCase()}
					</h3>
					<div className='flex flex-col sm:flex-row sm:items-center gap-3'>
						<div className='flex items-center gap-2 text-gray-400'>
							<Calendar className='w-4 h-4' />
							<span className='font-elegant text-sm'>{orderDate}</span>
						</div>
						<div className='flex items-center gap-2'>
							<CheckCircle className='w-4 h-4' />
							<span className={`px-3 py-1 rounded-md border text-xs font-elegant uppercase tracking-wider ${getStatusColor(order.status || "pending")}`}>
								{order.status || "pending"}
							</span>
						</div>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<DollarSign className='w-5 h-5 text-yellow-500' />
					<span className='font-galassia text-2xl text-gold-gradient'>
						${order.totalAmount.toFixed(2)}
					</span>
				</div>
			</div>

			{/* Order Items */}
			<div className='space-y-4'>
				<h4 className='font-modern text-sm text-gray-400 uppercase tracking-wider mb-3'>
					Items ({order.products.length})
				</h4>
				{order.products.map((item) => (
					<div 
						key={item._id} 
						className='flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg'
					>
						{item.product?.image && (
							<img 
								src={item.product.image} 
								alt={item.product?.name || 'Product'} 
								className='w-16 h-16 object-cover rounded-md'
							/>
						)}
						<div className='flex-1'>
							<h5 className='font-elegant text-white mb-1'>
								{item.product?.name || 'Product'}
							</h5>
							<div className='flex items-center gap-4 text-sm text-gray-400'>
								<span>Qty: {item.quantity}</span>
								<span>•</span>
								<span>${item.price.toFixed(2)} each</span>
							</div>
						</div>
						<div className='font-galassia text-yellow-400'>
							${(item.price * item.quantity).toFixed(2)}
						</div>
					</div>
				))}
			</div>

			{/* Shipping Address & Payment Method */}
			{order.shippingAddress && (
				<div className='mt-6 pt-6 border-t border-gray-700'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Shipping Address */}
						<div>
							<h4 className='flex items-center gap-2 font-modern text-xs text-gray-400 uppercase tracking-wider mb-2'>
								<MapPin className='w-3 h-3' />
								Shipping Address
							</h4>
							<div className='bg-gray-800/30 p-4 rounded-lg'>
								<p className='font-elegant text-white mb-1'>{order.shippingAddress.name}</p>
								<p className='font-elegant text-gray-400 text-sm'>{order.shippingAddress.phone}</p>
								<p className='font-elegant text-gray-400 text-sm mt-2'>
									{order.shippingAddress.address}
								</p>
								<p className='font-elegant text-gray-400 text-sm'>
									{order.shippingAddress.city}, {order.shippingAddress.zipCode}
								</p>
							</div>
						</div>

						{/* Payment Method */}
						<div>
							<h4 className='flex items-center gap-2 font-modern text-xs text-gray-400 uppercase tracking-wider mb-2'>
								Payment Method
							</h4>
							<div className='bg-gray-800/30 p-4 rounded-lg flex items-center gap-3'>
								{order.paymentMethod === "cash" ? (
									<>
										<Banknote className='w-10 h-10 text-yellow-500' />
										<div>
											<p className='font-elegant text-white'>Cash on Delivery</p>
											<p className='font-elegant text-gray-400 text-sm'>Pay when you receive</p>
										</div>
									</>
								) : (
									<>
										<CreditCard className='w-10 h-10 text-yellow-500' />
										<div>
											<p className='font-elegant text-white'>Card Payment</p>
											<p className='font-elegant text-gray-400 text-sm'>Paid online</p>
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

const EmptyOrdersUI = () => (
	<motion.div
		className='luxury-card flex flex-col items-center justify-center space-y-6 py-16 px-8'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='relative'>
			<ShoppingBag className='h-20 w-20 text-gray-600' />
			<Diamond className='h-8 w-8 text-yellow-500 absolute -top-2 -right-2 animate-pulse' />
		</div>
		
		<div className='text-center'>
			<h3 className='font-galassia text-2xl text-gold-gradient mb-2'>
				No Orders Yet
			</h3>
			<p className='font-elegant text-gray-400 text-lg mb-6'>
				Start exploring our exquisite collection
			</p>
			<a
				href='/'
				className='btn-gold rounded-md inline-flex items-center gap-2 px-6 py-3'
			>
				<span className='font-modern text-sm uppercase tracking-wider'>Shop Now</span>
			</a>
		</div>
	</motion.div>
);

export default OrderHistoryPage;
