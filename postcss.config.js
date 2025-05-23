const path = require('path');

module.exports = {
  plugins: [
    [
      'postcss-import',
      {
        path: [path.relative(process.cwd(), '../')],
      },
    ],
    path.resolve(__dirname, 'postcss-breakpoints'),
    'postcss-custom-media',
    'postcss-combine-duplicated-selectors',
    'postcss-discard-empty',
    path.resolve(__dirname, 'postcss-whitespace'),
  ],
};
