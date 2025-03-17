/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#2D2C7F",
          orange: "#DF8012",
          orangeLight: "#5812CC",
          border: "#D1DEEC",
          text: "#324356",
          cell: "#E5EDF6",
          red: "#F62E21",
          lightBlueShadow: "#45ABED",
          darkBlue: "#011E2F",
          lightGreen: "#3BD622",
          red: "#FF0000",
          blackText: "#222E3D",
          lightGray: "#FBFBFB",
          lightBlue: "#EDF7FC",
          green: "#38B044",
          gray: "#616161",
          yellow: "#FFA800",
          skyBlue: "#35A6F0",
          blueBorder: "#002941",
          grayBackground: "#F3F8FB",
          inputBorder: "#2D2C7F"
        },
        secondary: {
          blue: "#002941",
          gray: "#797979",
          green: "#6EBA6D",
          lightBlue: "#5D8CC4",
          grayText: "#456579",
          red: "#F00303",
          lowGray: "#B9B9B9",
          yellow: "#DE8909",
          skyBlue: "#3664CA",
        },
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
