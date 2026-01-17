import { BarChart, PlusCircle, ShoppingBasket, Package, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import OrdersTab from "../components/OrdersTab";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
	{ id: "create", label: "Add Piece", icon: PlusCircle },
	{ id: "products", label: "Collection", icon: ShoppingBasket },
	{ id: "orders", label: "Orders", icon: Package },
	{ id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className='min-h-screen relative overflow-hidden'>
			<div className='relative z-10 container mx-auto px-4 py-16'>
				{/* Header */}
				<motion.div
					className='text-center mb-12'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<img src='/Logo.png' alt='Galassia Logo' className='w-16 h-16 brightness-125' />
						<h1 className='font-galassia text-4xl text-gold-gradient'>
							Galassia Dashboard
						</h1>
						<img src='/Logo.png' alt='Galassia Logo' className='w-16 h-16 brightness-125' />
					</div>
					<p className='font-elegant text-xl text-gray-400 italic'>
						Manage Your Luxury Collection
					</p>
				</motion.div>

				{/* Tab Navigation */}
				<motion.div 
					className='flex justify-center mb-10'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<div className='inline-flex gap-2 p-2 bg-gray-900/50 rounded-lg border border-yellow-700/20'>
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-2 px-5 py-3 rounded-md font-modern text-sm uppercase tracking-wider transition-all duration-300 ${
									activeTab === tab.id
										? "bg-gradient-to-r from-yellow-700 to-yellow-800 text-white shadow-lg shadow-yellow-900/30"
										: "text-gray-400 hover:text-white hover:bg-gray-800"
								}`}
							>
								<tab.icon className='h-4 w-4' />
								{tab.label}
							</button>
						))}
					</div>
				</motion.div>

				{/* Tab Content */}
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					{activeTab === "create" && <CreateProductForm />}
					{activeTab === "products" && <ProductsList />}
					{activeTab === "orders" && <OrdersTab />}
					{activeTab === "analytics" && <AnalyticsTab />}
				</motion.div>
			</div>
		</div>
	);
};
export default AdminPage;
