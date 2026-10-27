/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0d0e12",
        darkTrack: "#17181e",
        roadAsphalt: "#1b1c23",
        trailGreen: "#45db7d",
        brandLime: "#def54f",
        brandCyan: "#6ac9ff",
        brandOrange: "#fa7328",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Syne", "Outfit", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        'glow-lime': '0 0 25px -5px rgba(222, 245, 79, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(106, 201, 255, 0.4)',
        'glow-orange': '0 0 25px -5px rgba(250, 115, 40, 0.4)',
        'glow-green': '0 0 30px -5px rgba(69, 219, 125, 0.6)',
      }
    },
  },
  plugins: [],
}
