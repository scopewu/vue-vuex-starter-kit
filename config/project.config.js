const ENV = process.env.NODE_ENV || 'development'

module.exports = {
  env: ENV,
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  globals: {
    'process.env': {
      'NODE_ENV': JSON.stringify(ENV)
    },
    NODE_ENV: ENV,
    __DEV__: ENV === 'development',
    __PROD__: ENV === 'production',
    __TEST__: ENV === 'test'
  }
}
