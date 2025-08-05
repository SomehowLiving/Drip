import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		// Enhanced responsive breakpoints
		screens: {
			'xs': '475px',    // Extra small devices
			'sm': '640px',    // Small devices (phones)
			'md': '768px',    // Medium devices (tablets)
			'lg': '1024px',   // Large devices (laptops)
			'xl': '1280px',   // Extra large devices
			'2xl': '1536px',  // 2X large devices
			'3xl': '1920px',  // Ultra-wide screens
			// Custom breakpoints for specific use cases
			'tablet': '640px',
			'laptop': '1024px',
			'desktop': '1280px',
			// Height-based breakpoints for better mobile experience
			'h-sm': { 'raw': '(max-height: 680px)' },
			'h-md': { 'raw': '(min-height: 681px) and (max-height: 900px)' },
			'h-lg': { 'raw': '(min-height: 901px)' },
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',     // Mobile padding
				'xs': '1rem',
				'sm': '1.5rem',      // Small devices
				'md': '2rem',        // Tablets
				'lg': '2.5rem',      // Laptops
				'xl': '3rem',        // Large screens
				'2xl': '4rem',       // Extra large screens
			},
			screens: {
				'xs': '475px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px',     // Your existing max-width
				'3xl': '1600px',
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					50:  'hsl(var(--primary-50))',
					100: 'hsl(var(--primary-100))',
					200: 'hsl(var(--primary-200))',
					300: 'hsl(var(--primary-300))',
					400: 'hsl(var(--primary-400))',
					500: 'hsl(var(--primary-500))',
					600: 'hsl(var(--primary-600))',
					700: 'hsl(var(--primary-700))',
					800: 'hsl(var(--primary-800))',
					900: 'hsl(var(--primary-900))',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					dark: 'hsl(var(--primary-dark))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			// Enhanced spacing scale for better mobile-first design
			spacing: {
				'safe-top': 'env(safe-area-inset-top)',
				'safe-bottom': 'env(safe-area-inset-bottom)',
				'safe-left': 'env(safe-area-inset-left)',
				'safe-right': 'env(safe-area-inset-right)',
			},
			// Responsive font sizes
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				// Responsive typography
				'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
				'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
				'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.5rem)',
				'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem)',
				'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2.25rem)',
			},
			// Better responsive border radius
			borderRadius: {
				'xs': '0.125rem',
				'sm': 'calc(var(--radius) - 4px)',
				'md': 'calc(var(--radius) - 2px)',
				'lg': 'var(--radius)',
				'xl': 'calc(var(--radius) + 2px)',
				'2xl': 'calc(var(--radius) + 4px)',
				'3xl': 'calc(var(--radius) + 8px)',
			},
			// Enhanced animations for better mobile performance
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-in-left': 'slide-in-left 0.3s ease-out',
				'bounce-gentle': 'bounce-gentle 2s infinite'
			},
			// Responsive grid utilities
			gridTemplateColumns: {
				'auto-fit-xs': 'repeat(auto-fit, minmax(200px, 1fr))',
				'auto-fit-sm': 'repeat(auto-fit, minmax(250px, 1fr))',
				'auto-fit-md': 'repeat(auto-fit, minmax(300px, 1fr))',
				'auto-fit-lg': 'repeat(auto-fit, minmax(350px, 1fr))',
			},
			// Touch-friendly sizing
			minHeight: {
				'touch': '44px',  // Minimum touch target size
				'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
			},
			minWidth: {
				'touch': '44px',
			},
			// Better responsive max-widths
			maxWidth: {
				'xs': '20rem',
				'sm': '24rem',
				'md': '28rem',
				'lg': '32rem',
				'xl': '36rem',
				'2xl': '42rem',
				'3xl': '48rem',
				'4xl': '56rem',
				'5xl': '64rem',
				'6xl': '72rem',
				'7xl': '80rem',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		// You might want to add these plugins for better responsiveness:
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/aspect-ratio'),
	],
} satisfies Config;