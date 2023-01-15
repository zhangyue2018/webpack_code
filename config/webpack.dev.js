const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //入口
    entry: './src/main.js', //相对路径
    //输出
    output: {
        // 所有文件的输出目录
        // __dirname:当前文件的文件夹目录，但是dev环境不会输出打包文件，所以这个设置可以是undefined
        // path: path.resolve(__dirname, '../dist'), // 绝对路径
        path: undefined, // 绝对路径
        // 入口文件打包输出文件名(即entry定义的文件)
        filename: 'static/js/main1.js',
        // 自动清空上次的打包内容
        // 原理：在打包前，将path整个目录清空，再进行打包
        // clean: true,
    },
    //加载器
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        // 执行顺序：从右到左
                        use: [
                            'style-loader', // 将js中的css通过创建style标签添加到html文件中生效
                            'css-loader' // 将css资源编译成commonjs的模块到js中
                        ]
                    },
                    {
                        test: /\.less$/,
                        // loader: 'xxx', // loader只能使用一个loader
                        use: ['style-loader', 'css-loader', 'less-loader']
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: ['style-loader', 'css-loader', 'sass-loader']
                    },
                    {
                        test: /\.styl$/,
                        use: ['style-loader', 'css-loader', 'stylus-loader']
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
                        // exclude: /node_modules/, // 排除node_modules中的js文件（这些文件不处理）
                        include: path.resolve(__dirname, '../src'),  // 只处理src中的js文件, include和exclude只能写一个
                        loader: 'babel-loader',
                        // options: {
                        //     presets: ['@babel/preset-env'],
                        // }
                    }
                ]
            }
        ]
    },
    //插件
    plugins: [
        new ESLintPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules",  // 默认值
        }),
        new HtmlWebpackPlugin({
            // 模板，以public/index.html文件为模板创建新的html文件
            // 新的html文件特点：1.结构和原来一直 2.自动引入打包输出的资源
            template: path.resolve(__dirname, '../public/index.html'),
        })
    ],
    // 开发服务器:不会输出资源，在内存中编译打包
    devServer: {
        host: 'localhost', // 启动服务器域名
        port: 3000, // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot: true, // 开启HMR（默认值）注：对js文件无效，要想对js文件生效，js文件需要一些额外的代码
    },
    //模式
    mode: 'development',
    devtool: 'cheap-module-source-map',
}