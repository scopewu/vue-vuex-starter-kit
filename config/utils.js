const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const config = require('./project.config');

const {__PROD__} = config.globals;

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
        minimize: __PROD__,
        sourceMap: sourceMap
      }
    },
    {
      loader: 'postcss-loader'
    }
  ]

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = baseCssLoader;
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
      return ExtractTextWebpackPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      })
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  // TODO: Maybe you use less/stylus/styl, you should install the module with npm
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    //less: generateLoaders('less'),
    sass: generateLoaders('sass'),
    scss: generateLoaders('sass'),
    //stylus: generateLoaders('stylus'),
    //styl: generateLoaders('stylus')
  }
}

function styleLoaders(options) {
  const output = [];
  const loaders = cssLoaders(options);
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

function vueLoaderOptions() {
  return {
    loaders: cssLoaders({
      sourceMap: true,
      extract: __PROD__
    })
  }
}

module.exports.cssLoaders = cssLoaders
module.exports.styleLoaders = styleLoaders
module.exports.vueLoaderOptions = vueLoaderOptions
