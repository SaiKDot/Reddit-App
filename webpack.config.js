const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill','./src/index.js'],
  module: {
       rules: [
       {
         test: /\.(js|jsx)$/,
         exclude: /node_modules/,
         use: ['babel-loader']
       },
       {
           test:/\.css$/,
           use:['style-loader','css-loader']
       },
       {
           test: /\.(png|jp?g|svg)(\?v=\d+\.\d+\.\d+)?$/,
           use : [{
               loader: 'file-loader',
             options: {
                 name: '[name].[ext]'
             }}
             ]
       },
       {
         test: /\.(woff|woff2|eot|ttf)?$/,
         loader: 'file-loader',
         options: {
           name: "[name].[ext]"
         }
         },
       ]
     },
  output: {
       path: path.join( __dirname + '/dist'),
       publicPath: './dist',
       filename: 'bundle.js'
  },
  target: 'electron-renderer',
  devServer: {
    host: 'localhost', 
    port: 3000,
    contentBase: './dist',
    publicPath: '/dist',
    
    disableHostCheck: true,
    watchContentBase: true,
    compress: true,
    historyApiFallback: true
  },
   plugins: [
     new HtmlWebpackPlugin({
      template: './src/index.html'
     })
     ]
};