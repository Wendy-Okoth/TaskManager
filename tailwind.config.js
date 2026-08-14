/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        'field-bg': '#FAFAF7',
        'field-text': '#1C1C1A',
        'field-secondary': '#5B6470',
        'field-green': '#3F6C51',
        'field-amber': '#C97A2B',
      },
    },
  },
  plugins: [],
}