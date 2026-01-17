import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className='bg-gray-900 border-t border-gray-800 mt-auto'>
			<div className='max-w-screen-xl mx-auto px-4 py-12'>
				{/* Top Section */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
					{/* Company Info */}
					<div className='space-y-4'>
						<div className='flex items-center gap-3'>
							<img 
								src='/Logo.png' 
								alt='Logo' 
								className='w-12 h-12 brightness-125'
							/>
							<h3 className='font-galassia text-xl text-gold-gradient'>Galassia Jewelry</h3>
						</div>
						<p className='font-elegant text-gray-400 text-sm leading-relaxed'>
							Exquisite jewelry crafted with precision and elegance. Discover timeless pieces that celebrate your unique style.
						</p>
					</div>

					{/* Quick Links */}
					<div className='space-y-4'>
						<h4 className='font-galassia text-lg text-emerald-400'>Quick Links</h4>
						<ul className='space-y-2'>
							<li>
								<Link to='/' className='font-elegant text-gray-400 hover:text-emerald-400 transition-colors text-sm'>
									Home
								</Link>
							</li>
							<li>
								<Link to='/category/diamonds' className='font-elegant text-gray-400 hover:text-emerald-400 transition-colors text-sm'>
									Collections
								</Link>
							</li>
							<li>
								<Link to='/cart' className='font-elegant text-gray-400 hover:text-emerald-400 transition-colors text-sm'>
									Shopping Cart
								</Link>
							</li>
							<li>
								<Link to='/orders' className='font-elegant text-gray-400 hover:text-emerald-400 transition-colors text-sm'>
									Order History
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div className='space-y-4'>
						<h4 className='font-galassia text-lg text-emerald-400'>Contact Us</h4>
						<div className='space-y-3'>
							<div className='flex items-start gap-3'>
								<Mail className='w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0' />
								<div>
									<p className='font-elegant text-gray-400 text-sm'>Email</p>
									<a 
										href='mailto:contact@galassiajewelry.com' 
										className='font-elegant text-gray-300 hover:text-emerald-400 transition-colors text-sm'
									>
										contact@galassiajewelry.com
									</a>
								</div>
							</div>
							<div className='flex items-start gap-3'>
								<Phone className='w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0' />
								<div>
									<p className='font-elegant text-gray-400 text-sm'>Phone</p>
									<a 
										href='tel:+1234567890' 
										className='font-elegant text-gray-300 hover:text-emerald-400 transition-colors text-sm'
									>
										+1 (234) 567-890
									</a>
								</div>
							</div>
							<div className='flex items-start gap-3'>
								<MapPin className='w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0' />
								<div>
									<p className='font-elegant text-gray-400 text-sm'>Address</p>
									<p className='font-elegant text-gray-300 text-sm'>
										123 Jewelry Avenue<br />
										New York, NY 10001
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className='border-t border-gray-800 my-8'></div>

				{/* Bottom Section */}
				<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
					{/* Copyright */}
					<p className='font-elegant text-gray-400 text-sm text-center md:text-left'>
						© {new Date().getFullYear()} Galassia Jewelry. All rights reserved.
					</p>

					{/* Social Links */}
					<div className='flex items-center gap-4'>
						<a 
							href='https://facebook.com' 
							target='_blank' 
							rel='noopener noreferrer'
							className='p-2 rounded-full bg-gray-800 hover:bg-emerald-500 transition-colors group'
							aria-label='Facebook'
						>
							<Facebook className='w-5 h-5 text-gray-400 group-hover:text-white transition-colors' />
						</a>
						<a 
							href='https://instagram.com' 
							target='_blank' 
							rel='noopener noreferrer'
							className='p-2 rounded-full bg-gray-800 hover:bg-emerald-500 transition-colors group'
							aria-label='Instagram'
						>
							<Instagram className='w-5 h-5 text-gray-400 group-hover:text-white transition-colors' />
						</a>
						<a 
							href='https://twitter.com' 
							target='_blank' 
							rel='noopener noreferrer'
							className='p-2 rounded-full bg-gray-800 hover:bg-emerald-500 transition-colors group'
							aria-label='Twitter'
						>
							<Twitter className='w-5 h-5 text-gray-400 group-hover:text-white transition-colors' />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
