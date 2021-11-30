const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const webpack = require('webpack');
/**
 * HTML
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        if(name == 'index') {
            return new HtmlWebpackPlugin({
                filename: `index.html`,
                template: path.resolve(__dirname, `${templateDir}/${name}.html`),
                inject: false,
                minify: false
            })
        } else {
            return new HtmlWebpackPlugin({
                filename: `${name}/index.html`,
                template: path.resolve(__dirname, `${templateDir}/${name}/index.html`),
                inject: false,
                minify: false
            })
        }
    })
}

const htmlPlugins = generateHtmlPlugins('./src/html/views');



/**
 * Optimize & minimize JS/CSS
 */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

/**
 * Autoprefix and beautify CSS
 */
const StyleLintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/js/scripts.js',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'js/scripts.js',
        library: 'app'
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: (url, resourcePath) => {
                                if (url.includes("images/")) {
                                    return false;
                                }
                                return true;
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                includePaths: ["build/css/**/*.*"],
                                plugins:[
                                    function () {
                                        return [
                                            autoprefixer({grid: 'autoplace'}),
                                        ]
                                    },
                                ]
                            }

                        }
                    },
                    "sass-loader",
                    "import-glob-loader"
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/html/includes'),
                use: ['raw-loader']
            },
        ]
    },

    optimization: {
        minimizer: [
            new TerserPlugin({extractComments: false}),
            new CssMinimizerPlugin()
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/styles.css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new StyleLintPlugin({
            fix: true,
            quiet: true
        })
    ].concat(htmlPlugins),
    stats: {
        builtAt: true,
        children: false,
        entrypoints: false,
        errors: true,
        hash: false,
        modules: false,
        version: false,
        warnings: false
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        historyApiFallback: true,
        noInfo: false,
        overlay: true,
        inline: true,
    },
    devtool: false
};
