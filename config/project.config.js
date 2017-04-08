const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost'
}

config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  NODE_ENV: config.env,
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production',
  __TEST__: config.env === 'test',
}

module.exports = config
