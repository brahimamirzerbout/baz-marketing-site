import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,mdx}'],
  darkMode: ['selector', '.dark'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // shadcn OKLCH tokens
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'oklch(var(--card) / <alpha-value>)',
          foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover) / <alpha-value>)',
          foreground: 'oklch(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
        },
        // Accentuation colors
        success: {
          DEFAULT: 'oklch(var(--success) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'oklch(var(--warning) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'oklch(var(--info) / <alpha-value>)',
        },
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        // Legacy tokens — mapped to new system so existing components work
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          50: 'rgb(var(--c-paper-50) / <alpha-value>)',
          100: 'rgb(var(--c-paper-100) / <alpha-value>)',
          200: 'rgb(var(--c-paper-200) / <alpha-value>)',
          300: 'rgb(var(--c-paper-300) / <alpha-value>)',
          400: 'rgb(var(--c-ink-400) / <alpha-value>)',
          500: 'rgb(var(--c-ink-500) / <alpha-value>)',
          600: 'rgb(var(--c-ink-600) / <alpha-value>)',
          700: 'rgb(var(--c-ink-700) / <alpha-value>)',
          800: 'rgb(var(--c-ink-800) / <alpha-value>)',
          900: 'rgb(var(--c-ink-900) / <alpha-value>)',
          950: 'rgb(var(--c-ink-950) / <alpha-value>)',
        },
        paper: {
          DEFAULT: 'rgb(var(--c-paper) / <alpha-value>)',
          50: 'rgb(var(--c-paper-50) / <alpha-value>)',
          100: 'rgb(var(--c-paper-100) / <alpha-value>)',
          200: 'rgb(var(--c-paper-200) / <alpha-value>)',
          300: 'rgb(var(--c-paper-300) / <alpha-value>)',
          400: 'rgb(var(--c-paper-400) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fibonacci px scale (Da Vinci: line-height = size × φ)
        'fib-micro': ['8px', { lineHeight: '13px' }],
        'fib-tiny': ['10px', { lineHeight: '16px' }],
        'fib-xs': ['13px', { lineHeight: '21px' }],
        'fib-sm': ['16px', { lineHeight: '26px' }],
        'fib-base': ['21px', { lineHeight: '34px' }],
        'fib-lg': ['34px', { lineHeight: '55px' }],
        'fib-xl': ['55px', { lineHeight: '89px' }],
        'fib-xxl': ['89px', { lineHeight: '144px' }],
        // Display scale — Fibonacci endpoints
        'display-2xl': ['clamp(3.5rem, 7vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],   /* 144px F(12) */
        'display-xl': ['clamp(2.75rem, 5.5vw, 5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.035em' }], /* 89px F(11) */
        'display-lg': ['clamp(2rem, 4vw, 3.4rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],  /* 55px F(10) */
        'display-md': ['clamp(1.5rem, 2.5vw, 2.1rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }], /* 34px F(9) */
      },
      // Fibonacci radius (px) — 3,5,8,13,21,34,55,89
      borderRadius: { sm: '5px', DEFAULT: '8px', md: '13px', lg: '21px', xl: '21px', '2xl': '34px', '3xl': '55px' },
      boxShadow: {
        // Fibonacci blur/spread at 0.377 opacity (F(14)/1000)
        soft: '0 1px 3px hsla(260,50%,0%,0.377), 0 8px 21px -8px hsla(260,50%,0%,0.233)',
        lift: '0 3px 8px hsla(260,50%,0%,0.377), 0 13px 34px -13px hsla(260,50%,0%,0.233)',
        ring: '0 0 0 1px hsla(260,10%,60%,0.144)',
        // Violet glow (golden-angle 270°)
        glow: '0 5px 21px hsla(270,85%,55%,0.233)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(13px)' },   /* F(7) */
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.377' },   /* F(14)/1000 */
        },
      },
      animation: {
        // Fibonacci durations + golden-ratio easing
        'fade-up': 'fade-up 610ms cubic-bezier(0.618,0,0.382,1) both',   /* F(15) float */
        marquee: 'marquee 32s linear infinite',
        'pulse-dot': 'pulse-dot 1597ms ease-in-out infinite',           /* F(17) */
      },
    },
  },
  plugins: [],
};

export default config;