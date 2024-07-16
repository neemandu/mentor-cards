/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      display: ['group-hover']
    }
  },
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
  },
}
console.log('Tailwind config is being loaded');