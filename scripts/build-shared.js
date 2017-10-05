
var fs = require('fs-extra')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

var SRC_DIR = path.join(__dirname, '../src/shared/')
var BUILD_DIR = path.join(__dirname, '../intermediate-builds/shared/')
var HTML_PATH = path.join(SRC_DIR, 'iframe.html')

if (process.env.NODE_ENV !== 'production') {
  throw new Error('Builds must have NODE_ENV=production')
}

// Empty the build directory.
fs.emptyDirSync(BUILD_DIR)

var config = {
  entry: path.join(SRC_DIR, 'js/index.js'),
  output: {
    path: BUILD_DIR,
    filename: 'js/newtab.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tab for a Cause',
      inject: false,
      template: HTML_PATH,
      filename: 'iframe.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ]
}

webpack(config).run((err, stats) => {
  if (err) {
    console.log('Failed to compile.', err)
    process.exit(1)
  }
  console.log('Webpack JS build complete.')
})

// Copy other files.
fs.copySync(path.join(SRC_DIR, 'img'), path.join(BUILD_DIR, 'img'))

console.log('Copied shared files to intermediate build.')
