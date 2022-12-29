const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssminimizerWebpackPlugin = require('css-minimizer-webpack-plugin');


function getStyleLoader(...pre) {
    return [
        MiniCssExtractPlugin.loader,
        'css-loader', // 将css资源编译成commonjs的模块到js中,
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        'postcss-preset-env', // 能解决大多数样式兼容性问题
                    ],
                }
            }
        },
        ...pre
    ].filter(Boolean)
}

module.exports = {
    //入口
    entry: './src/main.js', //相对路径
    //输出
    output: {
        // 所有文件的输出目录
        // __dirname:当前文件的文件夹目录
        path: path.resolve(__dirname, '../dist'), // 绝对路径
        // 入口文件打包输出文件名(即entry定义的文件)
        filename: 'static/js/main1.js',
        // 自动清空上次的打包内容
        // 原理：在打包前，将path整个目录清空，再进行打包
        clean: true,
    },
    //加载器
    module: {
        rules: [
            {
                test: /\.css$/,
                // 执行顺序：从右到左
                use: getStyleLoader(),
            },
            {
                test: /\.less$/,
                // loader: 'xxx', // loader只能使用一个loader
                use: getStyleLoader('less-loader'),
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader('sass-loader'),
            },
            {
                test: /\.styl$/,
                use: getStyleLoader('stylus-loader'),
            },
            {
                test: /\.(png|jpe?g|webp|gif|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 小于10kb的图片转base64
                        // 优点：减少请求数量，缺点：体积会更大
                        maxSize: 20 * 1024,
                    }
                },
                generator: {
                    // 输出图片名称
                    filename: 'static/images/[hash:8][ext][query]',
                }
            },
            {
                test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
                type: 'asset/resource', // 原封不动的输出文件内容
                generator: {
                    // 输出图片名称
                    filename: 'static/media/[hash:8][ext][query]',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules中的js文件（这些文件不处理）
                loader: 'babel-loader',
                // options: {
                //     presets: ['@babel/preset-env'],
                // }
            }
        ]
    },
    optimization: {
        minimizer: [
            '...',
            new CssminimizerWebpackPlugin(),
        ],
    },
    //插件
    plugins: [
        new ESLintPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname, '../src')
        }),
        new HtmlWebpackPlugin({
            // 模板，以public/index.html文件为模板创建新的html文件
            // 新的html文件特点：1.结构和原来一直 2.自动引入打包输出的资源
            template: path.resolve(__dirname, '../public/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/main.css',
        }),
        // new CssminimizerWebpackPlugin(),
    ],
    //模式
    mode: 'production'
}