module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // if you're using the App Router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // for Pages Router
  ],
  theme: {
    extend: {
      animation: {
        'bounce-in': 'bounce-in 0.3s ease-out',
      },
      keyframes: {
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
