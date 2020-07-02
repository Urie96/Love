const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        filename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Love Yue',
            hash: false,
            meta: {
                'Cache-control': {
                    'http-equiv': 'Cache-control',
                    content: 'no-store'
                }
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/, // 排除掉node_module目录
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env'
                            // {
                            //     "targets": {
                            //         "browsers": "ie 11"
                            //     },
                            //     "useBuiltIns": "usage",
                            //     "corejs": 3
                            // }
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
}
