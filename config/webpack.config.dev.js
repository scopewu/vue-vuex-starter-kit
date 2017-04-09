const helpers = require('./helpers');
const Webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const WebpackMergeDll = WebpackMerge.strategy({plugins: 'replace'});
const webpackCommonConfig = require('./webpack.config.common');
const config = require('./project.config');
const debug = require('debug')('app:webpack');

debug('Start the development config');

/*
 * webpack plugins
 * **/
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = WebpackMerge(webpackCommonConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    polyfills: helpers('src/polyfills'),
    main: [helpers('src/main')].concat(['webpack-hot-middleware/client?path=/__webpack_hmr'])
  },
  output: {
    path: helpers('dist'),
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].chunk.js',
    library: 'ac_[name]',
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader'
        }],
        include: helpers('src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [helpers('src')]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [helpers('src')]
      }
    ]
  },
  resolve: {
    alias: {
      vue: helpers('node_modules/vue/dist/vue'),
      vuex: helpers('node_modules/vuex/dist/vuex'),
      'vue-router': helpers('node_modules/vue-router/dist/vue-router'),
    }
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    /**
     * see: https://github.com/shlomiassaf/webpack-dll-bundles-plugin
     */
    new DllBundlesPlugin({
      bundles: {
        polyfills: [
          'core-js'
        ],
        vendor: [
          'vue',
          'vue-router',
          'vuex',
          'axios'
        ]
      },
      dllDir: helpers('dll'),
      webpackConfig: WebpackMergeDll(webpackCommonConfig, {
        devtool: 'cheap-module-source-map',
        plugins: []
      })
    }),
    new AddAssetHtmlPlugin([
      { filepath: helpers(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
      { filepath: helpers(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
    ]),
    new LoaderOptionsPlugin({
      debug: true,
      options: {}
    })
  ],
  devServer: {
    port: config.port,
    host: config.host,
    hot: true,
    inline: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },

})
