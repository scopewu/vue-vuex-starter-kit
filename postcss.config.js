
module.exports = {
  map: true,
  plugins: [
    require('autoprefixer')({
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    })
  ]
}
