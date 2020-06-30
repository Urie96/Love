const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,//排除掉node_module目录
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env',
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
            }
        ]
    }
};