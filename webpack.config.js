const VueLoaderPlugin = require('vue-loader/lib/plugin')

let path = require('path');

module.exports = {
    mode:"production",

    entry: {
        main: './src/index.js',
    },
    output: {
        path: __dirname + '/js/build',
        publicPath: './js/build',
        filename: '[name].js',
        sourceMapFilename: "[name].js.map",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}