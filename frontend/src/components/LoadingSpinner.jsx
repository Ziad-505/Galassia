import { Diamond } from "lucide-react";

const LoadingSpinner = () => {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950'>
			{/* Animated Diamond */}
			<div className='relative'>
				<Diamond className='w-16 h-16 text-yellow-500 animate-pulse' />
				
				{/* Rotating Ring */}
				<div className='absolute inset-0 -m-4'>
					<div className='w-24 h-24 border-2 border-transparent border-t-yellow-600 border-r-yellow-600/50 rounded-full animate-spin' />
				</div>
			</div>
			
			{/* Loading Text */}
			<p className='mt-8 font-galassia text-lg text-gold-gradient tracking-widest'>
				Galassia
			</p>
			<p className='mt-2 font-elegant text-gray-500 italic'>
				Loading luxury...
			</p>
		</div>
	);
};

export default LoadingSpinner;
