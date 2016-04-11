var webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  resolve: {
    modulesDirectories: ['node_modules', 'scripts', 'stylesheets'],
    extensions: ['', '.js', '.scss'],
  },
  entry: ['./js/index', './styles/main.scss'],
  output: {
    filename: 'browser-bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("main.css")
  ]
};
