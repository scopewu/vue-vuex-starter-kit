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
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MinChunkSizePlugin = require('webpack/lib/optimize/MinChunkSizePlugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')

module.exports = WebpackMerge(webpackCommonConfig, {
  mode: 'production',
  devtool: 'source-map',
  bail: true,
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
            // useRelativePath: true,
            name: 'media/img/[name].[hash:7].[ext]'
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
            // useRelativePath: true,
            name: 'media/fonts/[name].[hash:7].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash:7].css',
      chunkFilename: '[id].[chunkhash].css'
    }),
    new ModuleConcatenationPlugin(),
    /*
     * See: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
     * **/
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        ie8: false,
        output: {
          comments: false,
          beautify: false
        },
        mangle: {},
        compress: true
      }
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
