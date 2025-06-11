/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#3d4750',  // Example primary color
        secondary: '#e91e63', // Example secondary color 
      },
      fontFamily: {
        poppins: ["Montserrat", "sans-serif"],
        cookie: ['Cookie', 'cursive'],
      },
    },
  },
  plugins: [],
};
