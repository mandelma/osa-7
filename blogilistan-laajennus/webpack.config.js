const path = require("path");

const config = {
    entry: [
        "@babel/polyfill",
        "./src/index.js"
    ],
    output: {
        path: path.resolve(__dirname,"build"),
        filename: "main.js"
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
      proxy: {
        '/api/**': {
          target: 'http://localhost:3003'
        }
      }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ]
                }
            },
            {
              test: /\.css$/,
              loader: ['style-loader', 'css-loader']
            }
        ]
    }
};

module.exports = config;



/* const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require("webpack-manifest-plugin")
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const path = require('path')

const config = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3003'
      }
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ManifestPlugin({
      template: './public/manifest.json'
    }),
    new FaviconsWebpackPlugin('./public/manifest.json')
  ]
}

module.exports = config */