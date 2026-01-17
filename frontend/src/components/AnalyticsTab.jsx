import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign, Diamond } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center py-20'>
				<Diamond className='w-8 h-8 text-yellow-500 animate-pulse' />
				<span className='ml-3 font-elegant text-gray-400'>Loading analytics...</span>
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			{/* Analytics Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
				<AnalyticsCard
					title='Total Clients'
					value={analyticsData.users.toLocaleString()}
					icon={Users}
					gradient='from-amber-600/20 to-yellow-700/20'
				/>
				<AnalyticsCard
					title='Collection Pieces'
					value={analyticsData.products.toLocaleString()}
					icon={Package}
					gradient='from-yellow-600/20 to-amber-700/20'
				/>
				<AnalyticsCard
					title='Total Orders'
					value={analyticsData.totalSales.toLocaleString()}
					icon={ShoppingCart}
					gradient='from-amber-500/20 to-yellow-600/20'
				/>
				<AnalyticsCard
					title='Total Revenue'
					value={`$${analyticsData.totalRevenue.toLocaleString()}`}
					icon={DollarSign}
					gradient='from-yellow-500/20 to-amber-600/20'
				/>
			</div>

			{/* Revenue Chart */}
			<motion.div
				className='luxury-card p-6'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
				<div className='flex items-center gap-3 mb-6'>
					<Diamond className='w-5 h-5 text-yellow-500' />
					<h3 className='font-galassia text-lg text-gold-gradient'>Sales Performance</h3>
				</div>
				
				<ResponsiveContainer width='100%' height={400}>
					<LineChart data={dailySalesData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='name' stroke='#9CA3AF' fontSize={12} />
						<YAxis yAxisId='left' stroke='#9CA3AF' fontSize={12} />
						<YAxis yAxisId='right' orientation='right' stroke='#9CA3AF' fontSize={12} />
						<Tooltip 
							contentStyle={{ 
								backgroundColor: '#1F2937', 
								border: '1px solid rgba(212, 175, 55, 0.3)',
								borderRadius: '8px',
								color: '#fff'
							}}
						/>
						<Legend />
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='sales'
							stroke='#D4AF37'
							strokeWidth={2}
							activeDot={{ r: 6, fill: '#D4AF37' }}
							name='Orders'
						/>
						<Line
							yAxisId='right'
							type='monotone'
							dataKey='revenue'
							stroke='#F59E0B'
							strokeWidth={2}
							activeDot={{ r: 6, fill: '#F59E0B' }}
							name='Revenue ($)'
						/>
					</LineChart>
				</ResponsiveContainer>
			</motion.div>
		</div>
	);
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, gradient }) => (
	<motion.div
		className={`luxury-card p-6 relative overflow-hidden bg-gradient-to-br ${gradient}`}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex justify-between items-start'>
			<div className='z-10'>
				<p className='font-modern text-xs text-gray-400 uppercase tracking-wider mb-2'>{title}</p>
				<h3 className='font-galassia text-2xl text-gold-gradient'>{value}</h3>
			</div>
			<div className='p-3 bg-yellow-600/20 rounded-lg'>
				<Icon className='h-6 w-6 text-yellow-500' />
			</div>
		</div>
		
		{/* Decorative Corner */}
		<div className='absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-yellow-600/10 to-transparent rounded-tl-full' />
	</motion.div>
);
