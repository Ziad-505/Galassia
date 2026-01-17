import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-[80vh]'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<div className='flex justify-center mb-6'>
				<img src='/Logo.png' alt='Galassia Logo' className='w-28 h-28 brightness-125' />
				</div>
				<h2 className='text-center font-galassia text-3xl text-gold-gradient'>
					Join Galassia
				</h2>
				<p className='mt-2 text-center font-elegant text-gray-400 italic'>
					Begin your journey into luxury
				</p>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className='luxury-card py-8 px-6 sm:px-10'>
					<form onSubmit={handleSubmit} className='space-y-5'>
						<div>
							<label htmlFor='name' className='block font-modern text-xs text-gray-400 uppercase tracking-wider mb-2'>
								Full Name
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<User className='h-5 w-5 text-gray-500' aria-hidden='true' />
								</div>
								<input
									id='name'
									type='text'
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className='block w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md
									 font-elegant text-white placeholder-gray-500 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all duration-300'
									placeholder='Your full name'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='email' className='block font-modern text-xs text-gray-400 uppercase tracking-wider mb-2'>
								Email Address
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-gray-500' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className='block w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md
									 font-elegant text-white placeholder-gray-500 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all duration-300'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block font-modern text-xs text-gray-400 uppercase tracking-wider mb-2'>
								Password
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-500' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className='block w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md
									 font-elegant text-white placeholder-gray-500 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all duration-300'
									placeholder='Create a password'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='confirmPassword' className='block font-modern text-xs text-gray-400 uppercase tracking-wider mb-2'>
								Confirm Password
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-500' aria-hidden='true' />
								</div>
								<input
									id='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
									className='block w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md
									 font-elegant text-white placeholder-gray-500 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all duration-300'
									placeholder='Confirm your password'
								/>
							</div>
						</div>

						<button
							type='submit'
							className='w-full btn-gold rounded-md flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='h-5 w-5 animate-spin' aria-hidden='true' />
									<span className='font-modern text-sm uppercase tracking-wider'>Creating Account...</span>
								</>
							) : (
								<>
									<UserPlus className='h-5 w-5' aria-hidden='true' />
									<span className='font-modern text-sm uppercase tracking-wider'>Create Account</span>
								</>
							)}
						</button>
					</form>

					<div className='elegant-divider' />

					<p className='text-center font-modern text-sm text-gray-400'>
						Already a member?{" "}
						<Link to='/login' className='text-yellow-500 hover:text-yellow-400 transition-colors duration-300 inline-flex items-center gap-1'>
							Sign in <ArrowRight className='h-4 w-4' />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};
export default SignUpPage;
