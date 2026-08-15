/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ledger-bg': '#EDEDEB',
        'ledger-text': '#1A1D23',
        'ledger-indigo': '#3B4C8C',
        'ledger-tinted': '#8C97BF',
        'ledger-pale': '#D8DCE6',
        'ledger-card': '#F7F7F5',
        // Status colors
        'ledger-todo': '#B5452E',     // Red for To Do
        'ledger-progress': '#C97A2B', // Amber for In Progress
        'ledger-done': '#3F6C51',     // Green for Done
        'ledger-brick': '#B5452E',    // For overdue
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}