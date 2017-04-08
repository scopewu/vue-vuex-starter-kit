const helpers = require('./helpers');
// const Webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.config.common');
const debug = require('debug')('app:webpack');

debug('Start the production config');

/*
 * webpack plugins
 * **/
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = WebpackMerge(webpackCommonConfig, {
  devtool: 'source-map',
  output: {
    path: helpers('dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].[chunkhash].map',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                use: 'css-loader'
              }),
              sass: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader']
              })
            }
          }
        }],
        include: helpers('src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
        include: [helpers('src')]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
        include: [helpers('src')]
      }
    ]
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
