const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
    
    const htmlWebpackPlugin = new HtmlWebpackPlugin({
        minify   : {
            html5                          : true,
            collapseWhitespace             : true,
            minifyURLs                     : false,
            removeComments                 : true,
            removeRedundantAttributes      : true,
            removeScriptTypeAttributes     : true,
            removeStyleLinkTypeAttributese : true,
            useShortDoctype                : true
          },
        filename: 'index.html',
        title: 'appName',
        template: './src/index.html'
    });

    const plugins = [
        new MiniCssExtractPlugin({filename: "css/[name].[contenthash].css"})
    ];

    if(env.NODE_ENV === 'production'){
        plugins.push(new CleanWebpackPlugin(['dist'], {root: __dirname}));
        plugins.push(htmlWebpackPlugin);
        plugins.push(new Dotenv());
    }

    return {
        entry:{
            'app': ['babel-polyfill', path.resolve(__dirname, 'src/index.js')]
        },
        output:{
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].[hash].js',
            chunkFilename: 'js/[id].[chunkhash].js',
        },
        devServer:{
            port: 3000,
        },
        module:{
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    use:{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'stage-0', 'stage-2']
                        }
                    },
                },
                {   
                    test:/\.(css|sass|scss)$/,
                    use: [
                            {
                                loader: MiniCssExtractPlugin.loader
                            },
                            {
                                loader: 'css-loader', // translates CSS into CommonJS modules
                                options: {
                                    minimize: true,
                                },
                            },
                            {
                                loader: 'postcss-loader', // Run post css actions
                                options: {
                                  plugins: function () { // post css plugins, can be exported to postcss.config.js
                                    return [
                                      require('autoprefixer')
                                    ];
                                  }
                                }
                            },
                            {
                                loader: 'sass-loader' // compiles Sass to CSS
                            }
                        ]
                },
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    use:{
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            fallback: 'file-loader',
                            name: '/images/[name].[hash].[ext]',
                        }
                    }
                },
                {
                  test: /\.(woff|woff2|eot|ttf|svg)$/,
                  use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 100000,
                        name: '/css/fonts/[name].[ext]'
                      }
                    }
                  ]
                }
            ]
        },
        optimization: {
            minimizer: [
              new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
              }),
              new OptimizeCSSAssetsPlugin({})
            ]
          },
        plugins
    }
}
