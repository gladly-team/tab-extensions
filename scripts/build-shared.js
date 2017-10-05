
var fs = require('fs-extra');
var path = require('path');
var webpack = require('webpack');

var SRC_DIR = path.join(__dirname, '../src/shared/');
var BUILD_DIR = path.join(__dirname, '../intermediate-builds/shared/');

if (process.env.NODE_ENV !== 'production') {
  throw new Error('Builds must have NODE_ENV=production');
}

// Empty the build directory.
fs.emptyDirSync(BUILD_DIR);

var config = {
  entry: path.join(SRC_DIR, 'js/index.js'),
  output: {
      path: path.join(BUILD_DIR, 'js'),
      filename: 'newtab.js'
  }
};

webpack(config).run((err, stats) => {
  if (err) {
    console.log('Failed to compile.', err)
    process.exit(1)
  }
  console.log('Webpack JS build complete.');
});

// Copy other files.
fs.copySync(path.join(SRC_DIR, 'iframe.html'), path.join(BUILD_DIR, 'iframe.html'));
fs.copySync(path.join(SRC_DIR, 'img'), path.join(BUILD_DIR, 'img'));

console.log('Copied shared files to intermediate build.');
