const webpack = require('atool-build/lib/webpack');

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
      index: './web/index.js',
    },
    externals: {
      canvas: 'canvas',
      jsdom: 'jsdom',
    },
    target: 'electron-renderer',
    devtool: '#source-map',
  }, process.env.env === 'dev' ? dev : {});
};
