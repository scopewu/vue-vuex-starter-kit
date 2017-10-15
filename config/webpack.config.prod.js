const helpers = require('./helpers')
// const Webpack = require('webpack');
const WebpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.config.common')
const debug = require('debug')('app:webpack')
const config = require('./project.config')

debug('Start the production config')

/*
 * webpack plugins
 * **/
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const MinChunkSizePlugin = require('webpack/lib/optimize/MinChunkSizePlugin')
const OptimizeJsPlugin = require('optimize-js-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')

module.exports = WebpackMerge(webpackCommonConfig, {
  devtool: 'source-map',
  output: {
    path: config.outDir,
    publicPath: config.publicPath,
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|je?pg|gif)([?]?.*)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2048,
            context: helpers('src'),
            useRelativePath: true,
            name: 'img/[path][name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)([?]?.*)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2048,
            context: helpers('src'),
            useRelativePath: true,
            name: 'fonts/[path][name].[hash:7].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    new ModuleConcatenationPlugin(),
    /*
     * See: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
     * **/
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
      }
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    }),
    new CopyWebpackPlugin([
      {
        from: helpers('public'),
        to: config.outDir
      }
    ]),
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
    }),
    /*
    * While writing your code, you may have already added many code split points to load stuff on demand.
    * After compiling you might notice that there are too many chunks that are too small - creating larger HTTP overhead.
    * webpack can post-process your chunks by merging them.
    * See: https://webpack.js.org/plugins/limit-chunk-count-plugin/
    * **/
    new MinChunkSizePlugin({
      minChunkSize: 10000
    })
  ]
  /* node: {
   global: true,
   crypto: 'empty',
   fs: 'empty',
   net: 'empty',
   module: 'empty',
   process: false,
   clearImmediate: false,
   setImmediate: false
   } */
})
