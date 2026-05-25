/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0A0A0F',
          800: '#14141E',
          700: '#1F1F2E',
        },
        neon: {
          pink: '#FF2A6D',
          blue: '#05D9E8',
        }
      },
      fontFamily: {
        sans: ['Inter-Regular', 'sans-serif'],
        bold: ['Inter-Bold', 'sans-serif'],
      }
    },
  },
  plugins: [],
}