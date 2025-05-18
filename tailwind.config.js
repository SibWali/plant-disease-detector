/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nature': {
          50: '#f0f9f0',
          100: '#dcf0dc',
          200: '#bae0ba',
          300: '#8fc68f',
          400: '#5fa55f',
          500: '#3b833b',
          600: '#2d682d',
          700: '#255225',
          800: '#1f421f',
          900: '#1a371a',
        },
      },
    },
  },
  plugins: [],
} 