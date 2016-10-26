const webpack = require('atool-build/lib/webpack');
const path = require('path');

module.exports = function (webpackConfig) {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      env: JSON.stringify(process.env.env || 'dev'),
    },
  }));
  webpackConfig.babel.plugins.push(['antd', {
    style: true,
  }], 'transform-runtime');
  const dev = {
    devtool: '#eval-source-map',
    debug: true,
  };

  return Object.assign({}, webpackConfig, {
    entry: {
      index: './src/index.js',
    },
    output: {
      path: path.join(process.cwd(), '../dist/'),
      filename: "[name].js",
    },
    externals: {
      canvas: 'canvas',
      jsdom: 'jsdom',
    },
    target: 'electron-renderer',
    devtool: '#source-map',
  }, process.env.env === 'dev' ? dev : {});
};
