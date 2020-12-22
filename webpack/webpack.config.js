const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    ...getReviewHtml(),
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
        test: /\D+\.html$/,
        use: ['./webpack/html-loader.js'],
      },
    ],
  },
};

function getReviewHtml() {
  const htmls = fs.readdirSync('./src/html/review')
  return htmls.map((v, i) =>
    new HtmlWebpackPlugin({
      filename: i === 0 ? 'review/index.html' : `review/${i}.html`,
      favicon: './src/assets/favicon.svg',
      template: './src/html/review/' + v,
      chunks: ['review'],
      meta: {
        viewport: 'width=device-width,initial-scale=1,user-scalable=no',
      }
    }),
  )
}