/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 10px 30px rgba(0,0,0,0.35)',
        soft: '0 1px 2px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.08)',
        card: '0 1px 0 rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.08), 0 8px 28px rgba(15, 23, 42, 0.06)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-60%)' },
          '100%': { transform: 'translateX(60%)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

