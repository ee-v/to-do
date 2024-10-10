module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: false,
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: ["cupcake"],
  },
}
