const webpack = require('atool-build/lib/webpack');

module.exports = function (webpackConfig) {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      env: JSON.stringify(process.env.env || 'dev'),
    },
  }));
  webpackConfig.module.loaders = webpackConfig.module.loaders.map(l => {
    if (l.exclude && l.exclude.toString().indexOf('node_modules') > -1) {
      l.exclude = /node_modules(?:(\/jscodeshift\/dist))/;
    }
    return l;
  });

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
