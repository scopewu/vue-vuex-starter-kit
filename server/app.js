const express = require('express')
// const path = require('path')
const debug = require('debug')('app:server')
// const favicon = require('serve-favicon');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback')

const helpers = require('../config/helpers')
const config = require('../config/project.config')
const {__DEV__, __PROD__, __TEST__} = config.globals

// const index = require('./routes/index');

const app = express()

app.use(history())

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

if (__DEV__) {
  debug('Enabling webpack dev and HMR middleware')

  const Webpack = require('webpack')
  const webpackConfig = require('../webpack.config')
  const compiler = Webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: helpers('src'),
    hot: true,
    inline: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true
    }
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  app.use(express.static(helpers('public')))
  app.use(express.static(compiler.outputPath))
} else if (__PROD__) {
  debug('Prod environment server running.')
  app.use(express.static(config.outDir, {maxAge: '365d'}))
} else if (__TEST__) {
  debug('The test environment is under development.')
}

// app.use('/', index);

module.exports = app
