const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    extend: {},
  },

  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    theme: ["light", "dark"]
  },
  important: false,
};

module.exports = config;
