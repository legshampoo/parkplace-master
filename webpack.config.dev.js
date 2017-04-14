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
        test: /\.js|\.jsx?$/,
        exclude: path.join(__dirname, '/node_modules/'),
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'client')
      },
      //css
      {
        test: /\.styl$/,
        include: path.join(__dirname, 'client'),
        loader: 'style-loader!css-loader!stylus-loader'
      },
      //json (not necessary, but trying to ignore json)
      {
        test: /\.json$/,
        exclude: path.join(__dirname, '/client/data/*'),
        loader: 'json-loader'
      },
      //fonts
      {
        test: /\.(otf|ttc)$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      //images
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
};
