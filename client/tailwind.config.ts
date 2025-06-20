/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'border-spin': 'border-spin 7s linear infinite',
        shimmer: "shimmer 3s infinite",
      },
      keyframes: {
        shimmer: {
      "0%": { transform: "translateX(-100%) rotate(25deg)" },
      "100%": { transform: "translateX(100%) rotate(25deg)" },
    },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'before-spin' : {
          '100%' : {
            tranform : 'rotate(-360deg)'
          }
        }
      },
    },
  },
  plugins: [],
};
