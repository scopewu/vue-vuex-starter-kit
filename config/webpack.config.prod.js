const helpers = require('./helpers');
// const Webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.config.common');
const debug = require('debug')('app:webpack');

const {styleLoaders} = require('./utils');

debug('Start the production config');

/*
 * webpack plugins
 * **/
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

module.exports = WebpackMerge(webpackCommonConfig, {
  devtool: 'source-map',
  output: {
    path: helpers('dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|je?pg|gif)([\?]?.*)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1,
            context: helpers('src'),
            // useRelativePath: true,
            name: 'assets/img/[path][name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)([\?]?.*)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 1,
            name: 'assets/fonts/[name].[hash:7].[ext]'
          }
        }]
      }
    ].concat(styleLoaders({sourceMap: true, extract: true}))
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    new UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      beautify: false,
      output: {
        comments: false
      },
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        drop_debugger: true,
        drop_console: false,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      },
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    }),
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        htmlLoader: {
          minimize: true,
          removeAttributeQuotes: false,
          caseSensitive: true,
          customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/]
          ],
          customAttrAssign: [/\)?\]?=/]
        }
      }
    })
  ],
  /*node: {
   global: true,
   crypto: 'empty',
   fs: 'empty',
   net: 'empty',
   module: 'empty',
   process: false,
   clearImmediate: false,
   setImmediate: false
   }*/
})
