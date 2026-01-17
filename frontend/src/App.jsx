import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white relative overflow-hidden flex flex-col'>
			{/* Elegant Background with Diamond Pattern */}
			<div className='absolute inset-0 overflow-hidden'>
				{/* Main Gradient Overlay */}
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15)_0%,rgba(184,134,11,0.08)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
				
				{/* Floating Diamond Particles */}
				<div className='absolute top-20 left-10 w-2 h-2 bg-yellow-500/30 rotate-45 animate-float' style={{ animationDelay: '0s' }} />
				<div className='absolute top-40 right-20 w-3 h-3 bg-yellow-400/20 rotate-45 animate-float' style={{ animationDelay: '1s' }} />
				<div className='absolute top-60 left-1/4 w-1 h-1 bg-yellow-300/40 rotate-45 animate-float' style={{ animationDelay: '2s' }} />
				<div className='absolute top-80 right-1/3 w-2 h-2 bg-yellow-500/25 rotate-45 animate-float' style={{ animationDelay: '0.5s' }} />
				<div className='absolute bottom-40 left-1/3 w-2 h-2 bg-yellow-400/30 rotate-45 animate-float' style={{ animationDelay: '1.5s' }} />
				<div className='absolute bottom-60 right-10 w-1 h-1 bg-yellow-300/35 rotate-45 animate-float' style={{ animationDelay: '2.5s' }} />
				
				{/* Subtle Sparkle Effects */}
				<div className='absolute top-1/4 left-1/4 w-1 h-1 bg-white/50 rounded-full animate-sparkle' style={{ animationDelay: '0s' }} />
				<div className='absolute top-1/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-sparkle' style={{ animationDelay: '0.7s' }} />
				<div className='absolute bottom-1/4 left-1/2 w-1 h-1 bg-white/30 rounded-full animate-sparkle' style={{ animationDelay: '1.4s' }} />
				
				{/* Diamond Pattern Overlay */}
				<div className='absolute inset-0 diamond-pattern opacity-30' />
			</div>

			<div className='relative z-50 pt-20 flex-1'>
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
					<Route
						path='/admin-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
					<Route path='/category/:category' element={<CategoryPage />} />
					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route path='/orders' element={user ? <OrderHistoryPage /> : <Navigate to='/login' />} />
					<Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
				</Routes>
			</div>
			
			<Footer />
			
			<Toaster 
				position="top-center"
				toastOptions={{
					style: {
						background: '#1a1a2e',
						color: '#fff',
						border: '1px solid rgba(212, 175, 55, 0.3)',
					},
					success: {
						iconTheme: {
							primary: '#D4AF37',
							secondary: '#1a1a2e',
						},
					},
				}}
			/>
		</div>
	);
}

export default App;
