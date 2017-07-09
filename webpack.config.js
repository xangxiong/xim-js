import webpack from 'webpack';
import path from 'path';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    './src/index'
  ],
  target: 'web',
  output: {
    path:  path.join(__dirname, 'assets'),
    publicPath: '/assets',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
      {test: /(\.css)$/, loaders: ['style', 'css-loader']},
      {test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'}
    ]
  }
};