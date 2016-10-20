const webpack = require('atool-build/lib/webpack');

module.exports = function (webpackConfig) {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      env: JSON.stringify('pro'),
    },
  }));

  return Object.assign({}, webpackConfig, {
    entry: ['babel-polyfill', './main.development.js'],
    plugins: webpackConfig.plugins.filter(i =>
      !(i instanceof webpack.optimize.CommonsChunkPlugin)),
    output: {
      path: __dirname,
      filename: './main.js',
    },
    target: 'electron-main',
  });
};
