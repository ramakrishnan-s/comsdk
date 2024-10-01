 'use strict'

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const utils = require('./utils')
 const webpack = require('webpack')
 const config = require('../config')
 const merge = require('webpack-merge')
 const baseWebpackConfig = require('./webpack.base.conf')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
 const portfinder = require('portfinder')



 const HOST = process.env.HOST
 const PORT = process.env.PORT && Number(process.env.PORT)


/*
 module.exports = {
   context: path.resolve(__dirname, '../'),
   entry: './src/index.js',
   output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'bundle.js',
     publicPath: process.env.NODE_ENV === 'production'
       ? config.build.assetsPublicPath
       : config.dev.assetsPublicPath
   },
 /*  resolve: {
     extensions: ['.js', '.json'],
     alias: {
       'vue$': 'vue/dist/vue.esm.js',
       '@': resolve('src'),
     }
   },
   module: {
    rules: [

      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }

    ]
  },

   node: {
     // prevent webpack from injecting useless setImmediate polyfill because Vue
     // source contains it (although only uses it if it's native).
     setImmediate: false,
     // prevent webpack from injecting mocks to Node native modules
     // that does not make sense for the client
     dgram: 'empty',
     fs: 'empty',
     net: 'empty',
     tls: 'empty',
     child_process: 'empty'
   }

 }
*/
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry:  './src/index.js',


   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist/',
      port: 4040
   },

   plugins: [
     new CleanWebpackPlugin(['dist']),
   new HtmlWebpackPlugin({
       title: 'Development',
       template: 'index.html'
     })
    ],
    module: {
     rules: [

       {
         test: /\.css$/,
         use: [ 'style-loader', 'css-loader' ]
       },

       {
         test: /\.(png|svg|jpg|gif|ico)$/,
         use: [
           'file-loader'
         ]
       },
       {
         test: /\.html/,
         use: [
           'html-loader'
         ]
       },{
         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
         loader: 'url-loader',
         options: {
           limit: 10000,
           name: utils.assetsPath('img/[name].[hash:7].[ext]')
         }
       },
	   {
         test: /\.(ico)(\?.*)?$/,
         loader: 'url-loader',
         options: {
           limit: 10000,
           name: utils.assetsPath('icons/[name].[hash:7].[ext]')
         }
       },
       {
         test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
         loader: 'url-loader',
         options: {
           limit: 10000,
           name: utils.assetsPath('media/[name].[hash:7].[ext]')
         }
       },
       {
         test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
         loader: 'url-loader',
         options: {
           limit: 10000,
           name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
         }
       }

     ]
   },
  output: {

    path: path.resolve(__dirname, '../dist'),
    publicPath: "dist",
    filename: 'bundle.js'


  },

  resolve: {
     alias: {
       'vue': 'vue/dist/vue.min.js',
     }
   }
};
