import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        '128': '32rem',
      },
      colors: {
        mag : '#F7F0F5',
        dun : '#DECBB7',
        grey : '#8F857D',
        brown : '#5C5552',
        raisin : '#2F2523',
        night : '#161412',
        blue: {
          400: '#2F2523',
          500: '#2F2523',
          600: '#2F2523',
        },

      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
