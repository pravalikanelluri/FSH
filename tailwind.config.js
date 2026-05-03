/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: '#f3faf4',
          100: '#e2f5e5',
          200: '#c7eacd',
          300: '#9bd8a7',
          400: '#67bb76',
          500: '#439d53',
          600: '#327d40',
          700: '#2a6435',
          800: '#25502e',
          900: '#1f4228'
        }
      },
      boxShadow: {
        soft: '0 18px 60px rgba(31, 66, 40, 0.12)'
      }
    }
  },
  plugins: [],
};
