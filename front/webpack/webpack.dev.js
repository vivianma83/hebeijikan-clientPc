const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = [merge(common, {
    mode: "development",
    // devtool: 'inline-source-map',
    // devServer: {
    //     // contentBase: path.join(ROOTPATH, 'pages'),
    //     host: '0.0.0.0',
    //     port: 8086,
    //     open: true,
    //     overlay: {
    //       errors: true,
    //     }
    // }
})];