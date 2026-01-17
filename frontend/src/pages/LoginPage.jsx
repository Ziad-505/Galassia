import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
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
					Welcome Back
				</h2>
				<p className='mt-2 text-center font-elegant text-gray-400 italic'>
					Continue your luxury experience
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
									value={email}
									onChange={(e) => setEmail(e.target.value)}
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
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='block w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md
									 font-elegant text-white placeholder-gray-500 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all duration-300'
									placeholder='Enter your password'
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
									<span className='font-modern text-sm uppercase tracking-wider'>Signing In...</span>
								</>
							) : (
								<>
									<LogIn className='h-5 w-5' aria-hidden='true' />
									<span className='font-modern text-sm uppercase tracking-wider'>Sign In</span>
								</>
							)}
						</button>
					</form>

					<div className='elegant-divider' />

					<p className='text-center font-modern text-sm text-gray-400'>
						New to Galassia?{" "}
						<Link to='/signup' className='text-yellow-500 hover:text-yellow-400 transition-colors duration-300 inline-flex items-center gap-1'>
							Create an account <ArrowRight className='h-4 w-4' />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};
export default LoginPage;
