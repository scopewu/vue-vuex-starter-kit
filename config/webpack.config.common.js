const helpers = require('./helpers')
const config = require('./project.config')
const debug = require('debug')('app:webpack')

const {vueLoaderOptions, styleLoaders} = require('./utils')
const {__DEV__, __PROD__} = config.globals

debug('webpack start.')

/*
 * webpack plugins
 * **/
const DefinePlugin = require('webpack/lib/DefinePlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AssetsWebpackPlugin = require('assets-webpack-plugin')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')

module.exports = {
  entry: {
    main: helpers('src/main')
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [helpers('src'), helpers('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: vueLoaderOptions()
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        include: [helpers('src')]
      }
    ].concat(styleLoaders({sourceMap: __DEV__, extract: __PROD__}))
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    mainFields: ['jsnext:main', 'module', 'main'],
    modules: [helpers('src'), helpers('node_modules')],
    alias: {
      'vue': helpers('node_modules/vue/dist/vue.esm.js'),
      '@': helpers('src')
    }
  },
  plugins: [
    new DefinePlugin(config.globals),
    new ProgressPlugin(),
    new AssetsWebpackPlugin({
      path: helpers('dist'),
      filename: 'webpack-assets.json',
      prettyPrint: true
    }),
    new HtmlWebpackPlugin({
      template: helpers('src/index.html'),
      favicon: helpers('public/favicon.ico'),
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: {
        collapseWhitespace: __PROD__
      }
    }),
  ]
}
