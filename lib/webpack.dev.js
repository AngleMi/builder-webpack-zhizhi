const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
    mode: 'development',
    devServer: {
        contentBase: './dist',
        // oprn: true,
        hot: true,
        stats: 'errors-only',
    },
    devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
