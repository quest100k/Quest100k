/** @type {import('postcss-load-config').Config} */
const config = {
  // Tailwind 4 does its own vendor prefixing, so autoprefixer is gone.
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
