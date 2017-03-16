
var fs = require('fs-extra');
var path = require('path');

var archiver = require('archiver');

var BASE_BUILD_DIR = path.join(__dirname, '../build/');
var BUILD_DIR = path.join(BASE_BUILD_DIR, 'chromium/');
var SRC_DIR = path.join(__dirname, '../src/chromium/');

// Get the version number.
var manifest = require(path.join(SRC_DIR, 'manifest.json'));
var version = manifest['version'];
console.log('Building extension version ' + version + '...');

// Empty build target contents. This will also create the directory
// if it does not exist.
fs.emptyDir(BUILD_DIR);
 
// Create zip file.
var zipFileName = 'chrome-tfac-v' + version + '.zip';
var output = fs.createWriteStream(path.join(BUILD_DIR, zipFileName));
var archive = archiver('zip', {
    store: true // Sets the compression method to STORE. 
});
 
// Listen for all archive data to be written.
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('Finished building.');
});

archive.on('error', function(err) {
  throw err;
});
 
// Pipe archive data to the file.
archive.pipe(output);

// Append all files in our src directory.
archive.directory(SRC_DIR, '/');
 
// Finalize the archive (i.e. we are done appending files,
// but streams still have to finish).
archive.finalize();
