
export default {

  entry: {
    index: './src/index.js',
  },

  output: {
    filename: '[name].js',
    path: './dist',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },

  externals: {
    electron: 'require(\'electron\')',
  },

};
