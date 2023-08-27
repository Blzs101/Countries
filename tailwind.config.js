/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'dark-blue-element': 'hsl(209,23%,22%)',
        'very-dark-blue-bg': 'hsl(207, 26%, 17%)',
        'very-light-grey-bg': 'hsl(0, 0%, 98%)',
      },
      textColor: {
        'very-dark-blue-text': 'hsl(200, 15%, 8%)',
        'dark-grey-input': 'hsl(0, 0%, 52%)',
      },
    },
  },
  plugins: [],
};
