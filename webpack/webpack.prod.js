const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const common = require('./webpack.config.js');
const ChineseToUnicodePlugin = require('./chinese-to-unicode-plugin');

module.exports = merge(common, {
  plugins: [
    new ChineseToUnicodePlugin(),
    new CompressionPlugin({
      test: /\.(js|css|svg|ttf|html)$/,
      threshold: 1024 * 10,
      // deleteOriginalAssets: true,
    }),
  ],
  mode: 'production',
});
