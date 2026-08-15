/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ledger-bg': '#EDEDEB', // slightly darker grey
        'ledger-text': '#1A1D23',
        'ledger-indigo': '#3B4C8C',
        'ledger-tinted': '#8C97BF',
        'ledger-pale': '#D8DCE6', // slightly darker border
        'ledger-brick': '#B5452E',
        'ledger-card': '#F7F7F5', // card background
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}