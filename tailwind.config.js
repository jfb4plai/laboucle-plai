/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#edeae5',
        'paper-light': '#f7f4f0',
        ink: '#1c1917',
        'ink-soft': '#3d2b1f',
        'ink-muted': '#6b5a4e',
        'red-ink': '#a82520',
        'fac-bg': '#e8f4e8',
        'fac-text': '#1a5c2a',
        'fac-border': '#b2d8b2',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
