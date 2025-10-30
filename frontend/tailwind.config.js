module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4f46e5', // indigo-600
          secondary: '#2563eb', // blue-600
          accent: '#10b981', // emerald-500
        },
      },
      boxShadow: {
        card: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      }
    },
  },
  plugins: [],
}
