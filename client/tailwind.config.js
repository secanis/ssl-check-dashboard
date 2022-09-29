/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /bg-(red|blue)-(100|200|500)/,
    },
    {
      pattern: /bg-gray-(100|500|700)/,
    },
    {
      pattern: /text-(red|blue|white)-(500)/,
    },
    'hover:bg-gray-100',
    'bg-white',
    'animate-pulse',
  ],
  plugins: [require("daisyui")],
};
