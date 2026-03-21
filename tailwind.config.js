
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'Futura', 'sans-serif'],
        body: ['"Times New Roman"', 'Georgia', 'Cambria', 'serif'],
        accent: ['"League Spartan"', 'Futura', 'sans-serif'],
      },
      colors: {
        'brand-green': '#2E8B57',
        'brand-green-dark': '#1e6b41',
        'brand-red': '#D7263D',
        'brand-red-dark': '#b01e32',
        'brand-cream': '#FAF8F5',
        'brand-charcoal': '#1a1a1a',
      },
    },
  },
  plugins: [],
}
