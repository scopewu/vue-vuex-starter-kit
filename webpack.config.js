const {__DEV__, __PROD__, __TEST__} = require('./config/project.config').globals

module.exports = (() => {
  if (__DEV__) {
    return require('./config/webpack.config.dev')
  } else if (__PROD__) {
    return require('./config/webpack.config.prod')
  } else if (__TEST__) {
    return require('./config/webpack.config.test')
  } else {
    throw new Error('Please check environment config')
  }
})()
