const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
        filename: 'index.html',
        title: 'appName',
        template: './src/index.html'
    });


module.exports = {
  entry: {
    "app": ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    filename: 'js/[name].js'
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          }
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'sass-loader',
          options: {
              includePaths: [path.resolve(__dirname, '/dist/css/')]
          }// compiles Sass to CSS
        }]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
            fallback: 'file-loader',
            name: 'dist/images/[name].[hash].[ext]',
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
              name: 'dist/css/fonts/[name].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin
  ]
}