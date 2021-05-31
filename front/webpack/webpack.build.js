const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const cssnano = require('cssnano');
const PostcssSafeParser = require('postcss-safe-parser');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = [merge(common, {
    mode: "production",
    // devtool: 'source-map',
    plugins: [
        new OptimizeCSSAssetsPlugin({ // 压缩css文件
            assetNameRegExp: /bundle.css/g,
            cssProcessor: cssnano,
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                },
                parser: PostcssSafeParser,
                autoprefixer: false
            },
            canPrint: true
        })
    ],
    optimization:{
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions:{
                mangle: true,
                ie8: true
            }
          }),
        ],
      }
})];