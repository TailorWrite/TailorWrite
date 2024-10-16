/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const withMT = require("@material-tailwind/react/utils/withMT");
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const tailwindColors = require("tailwindcss/colors");

export default withMT({
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      slate: tailwindColors.slate,
      gray: tailwindColors.gray,
      neutral: tailwindColors.neutral,
      stone: tailwindColors.stone,
      red: tailwindColors.red,
      orange: tailwindColors.orange,
      amber: tailwindColors.amber,
      yellow: tailwindColors.yellow,
      lime: tailwindColors.lime,
      green: tailwindColors.green,
      emerald: tailwindColors.emerald,
      teal: tailwindColors.teal,
      cyan: tailwindColors.cyan,
      sky: tailwindColors.sky,
      blue: tailwindColors.blue,
      indigo: tailwindColors.indigo,
      violet: tailwindColors.violet,
      purple: tailwindColors.purple,
      fuchsia: tailwindColors.fuchsia,
      pink: tailwindColors.pink,
      rose: tailwindColors.rose,

      primaryDark: tailwindColors.neutral[900],     // "#161618",
      secondaryDark: "#1F1F21",
      
      darkBorder: tailwindColors.neutral[700], 
      lightBorder: tailwindColors.neutral[200],

      primaryDarkText: tailwindColors.neutral[200],
      secondaryDarkText: tailwindColors.neutral[400],

      primaryDarkAccent: tailwindColors.blue[500],
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
    // eslint-disable-next-line no-undef
    require('flowbite/plugin')
  ],
});