// const Webpack = require('webpack');
const helpers = require('./helpers');
const config = require('./project.config');
const debug = require('debug')('app:webpack');

const {vueLoaderOptions, styleLoaders} = require('./utils');
const {__DEV__, __PROD__} = config.globals;

debug('webpack start.');

/*
 * webpack plugins
 * **/
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

module.exports = {
  entry: {
    polyfills: helpers('src/polyfills'),
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
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: [helpers('src')]
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ].concat(styleLoaders({sourceMap: __DEV__, extract: __PROD__}))
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    mainFields: ['jsnext:main', 'main'],
    modules: [helpers('src'), helpers('node_modules')],
    alias: {
      'vue': helpers('node_modules/vue/dist/vue.esm.js'),
      'vue-router': helpers('node_modules/vue-router/dist/vue-router.esm.js'),
      'vuex': helpers('node_modules/vuex/dist/vuex.esm.js'),
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
      minify: {
        collapseWhitespace: __PROD__
      }
    }),
    new CommonsChunkPlugin({
      name: 'polyfills',
      chunks: ['polyfills']
    }),
    // This enables tree shaking of the vendor modules
    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: module => /node_modules/.test(module.resource)
    }),
    // Specify the correct order the scripts will be injected in
    new CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    })
  ]
}
