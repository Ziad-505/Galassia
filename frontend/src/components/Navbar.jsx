import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Diamond, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-950/90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-yellow-700/30'>
				<div className='container mx-auto px-3 sm:px-4 py-3 sm:py-4'>
					<div className='flex justify-between items-center gap-2'>
						{/* Logo */}
						<Link to='/' className='flex items-center space-x-2 sm:space-x-3 group shrink-0'>
							<img 
								src='/Logo.png' 
								alt='Galassia Logo' 
								className='w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 brightness-125 transition-all duration-300 group-hover:scale-110 group-hover:brightness-150'
							/>
							<span className='font-galassia text-xl sm:text-2xl md:text-3xl text-gold-gradient tracking-wider'>
								Galassia
							</span>
						</Link>

						{/* Navigation */}
						<nav className='flex items-center gap-1.5 sm:gap-2 md:gap-4'>
						<Link
							to={"/"}
							className='font-modern text-gray-300 hover:text-yellow-500 transition duration-300 ease-in-out text-xs sm:text-sm uppercase tracking-wider hidden md:block'
						>
							Collections
						</Link>
						{user && (
							<>
								<Link
									to={"/cart"}
									className='relative group text-gray-300 hover:text-yellow-500 transition duration-300 ease-in-out'
								>
									<ShoppingCart className='inline-block group-hover:text-yellow-500' size={18} />
									<span className='hidden lg:inline ml-1 font-modern text-sm uppercase tracking-wider'>Bag</span>
									{cart.length > 0 && (
										<span
											className='absolute -top-2 -left-2 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-full px-2 py-0.5 
										text-xs font-modern group-hover:from-yellow-500 group-hover:to-yellow-600 transition duration-300 ease-in-out'
										>
											{cart.length}
										</span>
									)}
								</Link>
								<Link
									to={"/orders"}
									className='text-gray-300 hover:text-yellow-500 transition duration-300 ease-in-out'
								>
									<Package className='inline-block' size={18} />
									<span className='hidden lg:inline ml-1 font-modern text-sm uppercase tracking-wider'>Orders</span>
								</Link>
							</>
						)}
						{isAdmin && (
							<Link
									className='bg-gradient-to-r from-yellow-700 to-yellow-800 hover:from-yellow-600 hover:to-yellow-700 text-white px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-md font-modern text-xs sm:text-sm transition duration-300 ease-in-out flex items-center uppercase tracking-wider'
									to={"/admin-dashboard"}
								>
									<Lock className='inline-block' size={14} />
									<span className='hidden lg:inline ml-2'>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-yellow-500 py-1.5 px-2 sm:py-2 sm:px-3 md:px-4 rounded-md flex items-center transition duration-300 ease-in-out border border-gray-700 hover:border-yellow-700/50'
								onClick={logout}
							>
								<LogOut size={16} />
								<span className='hidden lg:inline ml-2 font-modern text-sm uppercase tracking-wider'>Sign Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='bg-gradient-to-r from-yellow-700 to-yellow-800 hover:from-yellow-600 hover:to-yellow-700 text-white py-1.5 px-2 sm:py-2 sm:px-3 md:px-4 rounded-md flex items-center transition duration-300 ease-in-out font-modern text-xs sm:text-sm uppercase tracking-wider'
								>
									<UserPlus className='sm:mr-2' size={16} />
									<span className='hidden sm:inline'>Register</span>
								</Link>
								<Link
									to={"/login"}
									className='bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-yellow-500 py-1.5 px-2 sm:py-2 sm:px-3 md:px-4 rounded-md flex items-center transition duration-300 ease-in-out border border-gray-700 hover:border-yellow-700/50 font-modern text-xs sm:text-sm uppercase tracking-wider'
								>
									<LogIn className='sm:mr-2' size={16} />
									<span className='hidden sm:inline'>Sign In</span>
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};
export default Navbar;
