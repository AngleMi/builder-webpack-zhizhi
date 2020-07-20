const { merge } = require('webpack-merge');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const prodConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'ignore-loader',
            },
            {
                test: /\.less$/,
                use: 'ignore-loader',
            },
        ],
    },
    plugins: [
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: {
                        path: 'https://unpkg.com/react@16/umd/react.production.min.js',
                        attributes: {
                        // crossorigin: 'crossorigin',
                        },
                    },
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: {
                        path: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
                        attributes: {
                        // crossorigin: 'crossorigin',
                        },
                    },
                    global: 'ReactDOM',
                },
            ],
            hash: true,
            files: [
                'pages/search.html', // 这里要指定html 不然还是会多次注入并且不需要注入的html也会被注入，并且这个路径是打包后文件的所在路径
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2,
                },
            },
        },
    },
};

module.exports = merge(baseConfig, prodConfig);
