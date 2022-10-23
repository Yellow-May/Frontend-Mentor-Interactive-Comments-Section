/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      blue: {
        50: "hsl(239, 57%, 85%)", // Primary
        100: "hsl(211, 10%, 45%)", // Neutral
        200: "hsl(238, 40%, 52%)", // Primary
        300: "hsl(212, 24%, 26%)", // Neutral
      },
      red: {
        50: "hsl(357, 100%, 86%)", // Primary
        100: "hsl(358, 79%, 66%)", // Primary
      },
      gray: {
        50: "hsl(228, 33%, 97%)", // Neutral
        100: "hsl(223, 19%, 93%)" // Neutral
      },
      white: {
        DEAFULT: "hsl(0, 0%, 100%)" // Neutral
      },
    },
    fontFamily: {
      "rubik": ['Rubik', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
