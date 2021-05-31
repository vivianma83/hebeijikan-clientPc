/**
 * 说明：
 * 打包：
 * 1.通过babel和webpack打包生成js，css和html文件
 * 2.js和css文件位于think的static/sdk文件夹，这样在dev下可以访问
 * 3.生成的html中插入的js和css相对路径，如：/static/sdk/js/*.js可访问
 */
const path = require('path');
const ROOTPATH = path.join(__dirname, '../');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const HtmlWebpackPlugin = require('html-webpack-plugin');

const entriesPath = path.join(ROOTPATH, '/src/entries/'); // 入口文件
const distPath = path.join(ROOTPATH, '../think/www/static'); // 打包后静态文件地址，用于dev
// const htmlTplDir = path.join(ROOTPATH, '/src/tpls/');
// const viewDistPath = path.join(ROOTPATH, '../think/view/effect'); // 打包后html路径
// const htmlTpls = [ 'index', 'detail', 'list'];
// const tplSuffix = '.html';

// const htmlTplPlugins = htmlTpls.map((filepath) => {
//     const lastFile = `${filepath}${tplSuffix}`;
//     const buildFile = `${filepath}${tplSuffix}`;
//     const name = path.basename(lastFile, tplSuffix);
//     return new HtmlWebpackPlugin({
//         filename: path.join(viewDistPath, buildFile),
//         template: path.join(htmlTplDir, lastFile),
//         chunks: [name],
//         inject:'head'
//     });
// });
module.exports = {
    entry: {
        "index":[path.join(entriesPath, 'index/index')],
        "list":[path.join(entriesPath, 'list/index')],
        "detail":[path.join(entriesPath, 'detail/index')]
    },
    output: {
        path: distPath,
        filename: "js/[name].bundle.js", // string   
        publicPath: '/static'
    },
    module: {
        // 关于模块配置
        rules: [
            { // 模块规则（配置 loader、解析器等选项）
                test: /\.js?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [['@babel/preset-env']],
                        plugins: ['@babel/plugin-transform-modules-commonjs']
                    }
                },
                exclude: '/node_modules/'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    "sass-loader"
                ]
            }
        ],
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
        // 使用的扩展名
        alias: {
            // 模块别名列表
            "Common": path.resolve(ROOTPATH, "src/assets/common"),
            "Business": path.resolve(ROOTPATH, "src/assets/business/business"),
            "BusinessLog": path.resolve(ROOTPATH, "src/assets/business/log"),
            "Template": path.resolve(ROOTPATH, "src/assets/common/template"),
            "Util": path.resolve(ROOTPATH, "src/assets/util"),
            "Ajax": path.resolve(ROOTPATH, "src/assets/util/ajax"),
            "Cookie": path.resolve(ROOTPATH, "src/assets/util/cookie")
        },
    },
    externals: {
        jquery: 'window.$'
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            // minChunks: 1,
            chunks: "all",
            name: true,
            cacheGroups: {
                common: {
                    name: 'common',
                    // chunks: 'initial',
                    priority: 2,
                    minChunks: 2,
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({ // css组件
            path: distPath,
            filename: 'css/[name].bundle.css'
        }),
        // ...htmlTplPlugins
    ],
}