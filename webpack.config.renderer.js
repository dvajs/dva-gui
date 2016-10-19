module.exports = function (webpackConfig) {
  webpackConfig.babel.plugins.push(['antd', {
    style: 'css',
  }], 'transform-runtime');
  const dev = {
    devtool: '#eval-source-map',
    debug: true,
  };

  return Object.assign({}, webpackConfig, {
    entry: {
      index: './app/index.js',
    },
    externals: {
      canvas: 'canvas',
      jsdom: 'jsdom',
    },
    target: 'electron-renderer',
    devtool: '#source-map',
  }, process.env.env === 'dev' ? dev : {});
};
