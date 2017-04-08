const express = require('express');
const path = require('path');
const debug = require('debug')('app:server');
//const favicon = require('serve-favicon');
//const logger = require('morgan');
//const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const Webpack = require('webpack');

const helpers = require('../config/helpers');
const {__DEV__, __PROD__, __TEST__} = require('../config/project.config').globals;

//const index = require('./routes/index');

const app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(helpers(), 'public')));

if (__DEV__) {
  debug('Enabling webpack dev and HMR middleware');

  const webpackConfig = require('../webpack.config');
  const compiler = Webpack(webpackConfig);

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

  app.use(express.static(helpers('public')));

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else if (__PROD__) {
  debug('Prod environment server running.');
  app.use(express.static(helpers('dist')))
} else if (__TEST__) {
  debug('The test environment is under development.')
}

//app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
