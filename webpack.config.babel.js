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
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]'
        ),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap'
        ),
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
