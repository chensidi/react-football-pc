const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: 'source-map',
    entry: ['react-hot-loader/patch', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'football-pc'),
        filename: 'assets/js/[name:6].js'
    },
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp)$/,
                type: 'asset',
                exclude: /node_modules/,
                parser: {
					dataUrlCondition: {
						maxSize: 8 * 1024 //指定大小
					}
				},
                generator: {
                    filename: 'static/imgs/[hash:6].[ext]',
                    publicPath: './'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: {
                removeComments: true, //删除html注释
                collapseWhitespace: true //去掉空格
            },
            favicon: path.resolve(__dirname, './src/assets/imgs/dqd-logo.png')
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css'
        }),
        ...readDll(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname,'./public'),
                    to: 'static',
                    globOptions: {
                        dot: true,
                        ignore: [
                            "**/*.html",
                        ]
                    }
                }
              ],
        }),
        new CompressionPlugin({
            exclude: /node_modules/,
            filename: "[path][base].gz",
            threshold: 50 * 1024
        })
    ],
    devServer: {
        host: '127.0.0.1',
        port: 8088,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8089',
                changeOrigin: true,
            }
        },
        static: {
            directory: path.join(__dirname, 'public'),
        },
        open: true
    },
    resolve: {
        alias: setAlias(['' ,'components', 'pages', 'utils', 'assets', 'router', 'store', 'api']),
        extensions: ['.js', '.json', '.jsx']
    },
    externals: { //不需要打包的第三方库
        /* "react": "React",
        "react-dom": "ReactDOM" */
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            name: 'common'
        },
        // minimize: true,
        minimizer: [
            new TerserPlugin({
                exclude: /node_modules/,
                parallel: true,
                test: /\.js(\?.*)?$/i,
                terserOptions: {
                    compress: {
                        drop_console: true,//移除所有console相关代码；
                        drop_debugger: true,//移除自动断点功能；
                        pure_funcs: ["console.log", "console.error"],//配置移除指定的指令，如console.log,alert等
                    },
                },
                extractComments: true,
            })
        ]
    },
    performance: {
        hints: 'error', 
        maxAssetSize: 3000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 5000000 // 整数类型（以字节为单位）
    },
    cache: { //开启缓存
        type: 'filesystem',
        allowCollectingMemory: true,
        cacheDirectory: path.resolve(__dirname, '.temp_cache'),
    }
}


function readDll() {
    let plugins = [];
    fs.readdirSync(path.resolve(__dirname, 'dll')).forEach(file => {
        const filePath = path.resolve(__dirname, `./dll/${file}`);
        if(/.*\.js$/.test(file)){
            plugins.push(
                new AddAssetHtmlWebpackPlugin({
                    filepath: filePath,
                    publicPath: './assets/js',
                    outputPath: 'assets/js'
                })
            );
        }
    
        if(/.*\.json$/.test(file)){
            plugins.push(
                new webpack.DllReferencePlugin({
                    manifest: filePath
                })
            );
        }
    })
    return plugins;
}

function setAlias(aliasNames) {
    const aliasObj = {};
    aliasNames.map(alias => {
        aliasObj[`@${alias}`] = path.resolve(__dirname, `./src/${alias}`)
    });
    return aliasObj;
}