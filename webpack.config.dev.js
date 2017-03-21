var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/root'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
    // new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      //js
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'client')
      },
      //css
      {
        test: /\.styl$/,
        include: path.join(__dirname, 'client'),
        loader: 'style-loader!css-loader!stylus-loader'
      },
      //fonts
      {
        test: /\.(otf|ttc)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
      // {
      //   test: /\.(otf)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: 'assets/fonts/Gotham-Medium.otf',
      //   }
      // }
    ]
  }
};
