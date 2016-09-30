import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {

  devtool: '#eval',

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
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader'),
      },
    ],
  },

  externals: {
    electron: 'require(\'electron\')',
  },

  plugins: [
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true,
    }),
  ],

};
