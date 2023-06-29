/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  plugins: [
    require('tailwind-scrollbar'),
  ],
  theme: {
    extend: {
      keyframes: {
        pulseSlowly: {
          '0%, 100%': { transform: 'translate3d(0, -2px, 0)' },
          '50%': { transform: 'translate3d(0, 2px, 0)' }
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        'pulseSlowly':"pulseSlowly 3s ease-in-out infinite",
      }
    }
  }
}
