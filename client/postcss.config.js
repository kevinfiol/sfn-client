const autoprefixer = require('autoprefixer');

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './public/**/*.html',
    './src/**/*.svelte'
  ],

  whitelistPatterns: [/svelte-/],

  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

const production = !process.env.ROLLUP_WATCH

module.exports = {
  plugins: [
    require('tailwindcss'),
    autoprefixer,
    ...(production ? [purgecss] : [])
  ]
};


// const cssnano = require('cssnano');

// const tailwindcss = require('tailwindcss');

// const purgecss = require('@fullhuman/postcss-purgecss')({
//   content: [
//     './public/**/*.html',
//     './src/**/*.html',
//     './src/**/*.svelte'
//   ],

//   whitelistPatterns: [/svelte-/],

//   defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
// });

// const isProd = process.env.NODE_ENV === 'PROD';
// const isDev  = process.env.NODE_ENV === 'DEV';

// module.exports = {
//   plugins: [
//     tailwindcss,
//     autoprefixer,
//     ...(isProd ? [purgecss, cssnano] : [])
//   ]
// };
