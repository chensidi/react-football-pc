const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        antd: ['antd'],
        axios: ['axios'],
        // react相关的统一打包
        react: ['react', 'react-dom', 'react-redux', 'react-router-dom', 'react-router-config'],
        redux: ['redux']
    },
    output: {
        path: path.resolve(__dirname, 'dll'),
        filename: '[name].js',
        library: '[name]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, 'dll/[name].json')
        })
    ]
}