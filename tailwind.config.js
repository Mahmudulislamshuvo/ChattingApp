/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"],
        Poppins: ["Poppins", "sans - serif"],
      },
      colors: {
        ThemeColor: "#5F35F5",
      },
    },
  },
  plugins: [],
  plugins: [require("flowbite/plugin")],
};
