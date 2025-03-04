/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('/src/assets/bg-img.jpg')",
      },
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
