export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          cream: '#F5F5DC',
          beige: '#F4F1EA',
          charcoal: '#333333',
          darkBrown: '#2C2416',
          gold: '#D4AF37',
        },
      },
      fontFamily: {
        baby: ['var(--font-baby)', 'serif'],
        merriweather: ['Merriweather', 'serif'],
        crimson: ['Crimson Text', 'serif'],
      },
    },
  },
  plugins: [],
}
