const glob = require('glob');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const projectRoot = path.resolve(process.cwd(), 'test/smoke/template');
// 动态的设置entry和html-webpack-plugin
const setMAP = () => {
    const entry = {};
    const HtmlWebpackPlugins = [];
    // 获取各个页面的入口文件路径
    const entryFiles = glob.sync(path.resolve(projectRoot, './src/*/index.js'));
    // console.log(entryFiles);
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index];
        // 正则匹配pageName(即/Users/tal/Desktop/my-project/src/index/index.js，src和index.js之间的值)
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1];
        entry[pageName] = entryFile;
        return HtmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                // 本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)
                template: path.resolve(projectRoot, `src/${pageName}/index.html`),
                // 输出文件的文件名称，默认为index.html，不配置就是该文件名；此外，还可以为输出文件指定目录位置（例如'pages/index.html'）
                filename: `${pageName}.html`,
                // 提取的基础包名字可以不写
                chunks: ['vendors', pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false,
                },
            }),
        );
    });
    return {
        entry,
        HtmlWebpackPlugins,
    };
};

const { entry, HtmlWebpackPlugins } = setMAP();
module.exports = {
    entry,
    output: {
        path: path.resolve(projectRoot, 'dist'),
        filename: 'js/[name]_[chunkhash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                    // 'babel-loader',
                    // 'eslint-loader',
                ],
            },
            {
                test: /\.css$/,
                // loader的加载顺序从右向左，先解析css然后再把css加载到style中
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            // loader的加载顺序从右向左，先使用less-loader将less转换成css,然后解析css然后再把css加载到style中
            {

                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // postcss-loader要放在less-loader之前，否则css文件里如果有注释，打包时会报错
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'iOS 7'],
                                    // browsers: ['last 2 version', '>1%', 'iOS 7']
                                }),
                            ],
                        },
                    },
                    // px2rem要放在less-loader后面
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /.(png|jpe?g|gif)$/,
                // loader: ['file-loader']
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name]_[hash:8].[ext]',
                            // 这个路径要确认好
                            // publicPath: '../'
                        },
                    },
                ],
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                            publicPath: '../',
                        },
                    },
                ],
            },
        ],
    },
    stats: 'errors-only',
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:8].css',
        }),
        new FriendlyErrorsWebpackPlugin(),
    ].concat(HtmlWebpackPlugins),
};
