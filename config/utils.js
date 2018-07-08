const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./project.config')

const {__DEV__, __PROD__} = config.globals

/**
 * css loaders
 * @param sourceMap {boolean}
 * @param extract {boolean} `ExtractTextPlugin`
 * @returns {{css: *, postcss: *, less: *, sass: *, scss: *, stylus: *, styl: *}}
 */
function cssLoaders({sourceMap = false, extract = true}) {
  const baseCssLoader = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: sourceMap
      }
    },
    /*
    * Webpack loader that resolves relative paths in url() statements based on the original source file.
    * Use in conjunction with the sass-loader and specify your asset url() relative to the .scss file in question.
    *
    * See: https://github.com/webpack-contrib/css-loader/issues/38
    * **/
    {
      loader: 'resolve-url-loader'
    },
    /*{
      loader: 'postcss-loader',
      options: {
        sourceMap,
        plugins: [
          require('autoprefixer')({
            add: true,
            remove: true,
            browsers: ['last 2 versions']
          })
        ]
      }
    }*/
  ]

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = baseCssLoader
    if (loader && loader !== 'postcss') {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (extract) {
      return [MiniCssExtractPlugin.loader, ...loaders]
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  // TODO: Maybe you use less/stylus/styl, you should install the module with npm
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    // less: generateLoaders('less'),
    sass: generateLoaders('sass'),
    scss: generateLoaders('sass')
    // stylus: generateLoaders('stylus'),
    // styl: generateLoaders('stylus')
  }
}

function styleLoaders(options) {
  const output = []
  const loaders = cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader,
      exclude: [/node_modules/]
    })
  }
  return output
}

function vueLoaderOptions() {
  return {
    loaders: cssLoaders({
      sourceMap: __DEV__,
      extract: __PROD__
    })
  }
}

module.exports.cssLoaders = cssLoaders
module.exports.styleLoaders = styleLoaders
module.exports.vueLoaderOptions = vueLoaderOptions
