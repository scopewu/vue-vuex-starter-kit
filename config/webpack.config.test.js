const helpers = require('./helpers')
const WebpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.config.common')
const debug = require('debug')('app:webpack')

debug('Start the test config')

module.exports = WebpackMerge(webpackCommonConfig, {
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(png|je?pg|gif)([?]?.*)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1,
            name: 'assets/img/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)([?]?.*)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1,
            name: 'assets/fonts/[name].[ext]'
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      'vue': helpers('node_modules/vue/dist/vue.js')
    }
  },
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: []
})
