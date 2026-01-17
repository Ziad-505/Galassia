/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				gold: {
					light: '#E8D5B7',
					DEFAULT: '#D4AF37',
					dark: '#B8860B',
				},
				champagne: '#F7E7CE',
				ivory: '#FFFFF0',
				charcoal: '#1a1a2e',
				midnight: '#0f0f1a',
				platinum: '#E5E4E2',
			},
			fontFamily: {
				galassia: ['Cinzel', 'serif'],
				elegant: ['Cormorant Garamond', 'serif'],
				modern: ['Montserrat', 'sans-serif'],
			},
			animation: {
				'shimmer': 'shimmer 3s ease-in-out infinite',
				'sparkle': 'sparkle 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 3s ease-in-out infinite',
			},
			keyframes: {
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				sparkle: {
					'0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
					'50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				glow: {
					'0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3)' },
				},
			},
		},
	},
	plugins: [],
};
