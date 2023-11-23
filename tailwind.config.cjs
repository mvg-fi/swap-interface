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
    themes: [{
      light: {
        // "color-scheme": "light",
        "primary": "#5959D7",
        "secondary": "#557DED",
        "secondary-content": "oklch(98.71% 0.0106 342.55)",
        "accent": "oklch(76.76% 0.184 183.61)",
        "neutral": "#2B3440",
        "neutral-content": "#D7DDE4",
        "base-100": "oklch(100% 0 0)",
        "base-200": "#F2F2F2",
        "base-300": "#E5E6E6",
        "base-content": "#1f2937",
      }
    }, "dark"]
  },
  important: false,
};

module.exports = config;
