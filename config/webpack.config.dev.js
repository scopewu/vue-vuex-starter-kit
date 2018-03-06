const helpers = require('./helpers')
// const Webpack = require('webpack');
const WebpackMerge = require('webpack-merge')
// const WebpackMergeDll = WebpackMerge.strategy({plugins: 'replace'})
const webpackCommonConfig = require('./webpack.config.common')
const config = require('./project.config')
const debug = require('debug')('app:webpack')

debug('Start the development config')

/*
 * webpack plugins
 * **/
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin')

module.exports = WebpackMerge(webpackCommonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [helpers('src/main')].concat(['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true'])
  },
  output: {
    path: config.outDir,
    publicPath: config.publicPath,
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|je?pg|gif)([?]?.*)$/,
        use: [{
          loader: 'file-loader',
          options: {
            context: helpers('src'),
            name: '[path][name].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)([?]?.*)$/,
        use: [{
          loader: 'file-loader',
          options: {
            context: helpers('src'),
            name: '[path][name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new NoEmitOnErrorsPlugin(),
    new LoaderOptionsPlugin({
      debug: true,
      options: {}
    })
  ]
})
