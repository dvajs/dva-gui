const webpack = require('webpack');

module.exports = {
  entry: ['./main.development.js'],
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.json'],
  },
  output: {
    path: __dirname,
    filename: '../dist/main.js'
  },
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false
  },
}
