const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: { main: './src/index.js', review: './src/review.js' },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Love Yue',
      favicon: './src/assets/favicon.svg',
      meta: {
        viewport: 'width=device-width,initial-scale=1,user-scalable=no'
      },
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      title: '向悦悦检讨',
      filename: 'review/index.html',
      favicon: './src/assets/favicon.svg',
      chunks: ['review'],
    }),
    // new CopyPlugin({
    //   patterns: [{ from: 'src/assets' }],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.md$/,
        use: ['./webpack/html-loader.js', './webpack/markdown-loader.js'],
      },
      {
        test: /\.html$/,
        use: ['./webpack/html-loader.js'],
      },
    ],
  },
};
