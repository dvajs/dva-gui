const webpack = require('atool-build/lib/webpack');

module.exports = function (webpackConfig) {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      env: JSON.stringify('pro'),
    },
  }));

  return Object.assign({}, webpackConfig, {
    entry: {
      main: './app/main.development.js',
    },
    output: {
      path: __dirname,
      filename: './app/main.js',
    },
    target: 'electron-main',
  });
};
