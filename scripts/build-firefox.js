
var fs = require('fs-extra')
var path = require('path')
const execSync = require('child_process').execSync

var SRC_DIR = path.join(__dirname, '../src/firefox/')
var BUILD_DIR = path.join(__dirname, '../build/firefox/')
var INTERMEDIATE_BUILD_DIR = path.join(__dirname, '../intermediate-builds/firefox/')
var ADDON_STORE_INTERMEDIATE_BUILD_DIR = path.join(INTERMEDIATE_BUILD_DIR, 'addon-store')
var SELF_HOSTED_INTERMEDIATE_BUILD_DIR = path.join(INTERMEDIATE_BUILD_DIR, 'self-hosted')
var SHARED_CODE_BUILD_DIR = path.join(__dirname, '../intermediate-builds/shared/')

// Get the version number.
var manifest = require(path.join(SRC_DIR, 'manifest.json'))
var version = manifest['version']
console.log('Building extension version ' + version + '...')

// Empty build target contents. This will also create the directory
// if it does not exist.
fs.emptyDirSync(BUILD_DIR)
fs.emptyDirSync(INTERMEDIATE_BUILD_DIR)

// Create two Firefox builds with different configurations,
// one for the Mozilla addons store and the other to self-host
// to enable downloads from a web page.

// Filter copying source files to build. Return true if we should copy and
// false if we should not.
var filterCopiedFiles = (src, dest) => {
  var ignoredPaths = [
    '/tmp',
    'manifest.json',
    'manifest.addon-store-overrides.json',
    'manifest.self-hosted-overrides.json',
    '/__tests__'
  ]
  if (path.basename(src) === '.DS_Store') {
    return false
  }
  var containsIgnoredPath = ignoredPaths.some(function (ignoredPath) {
    return src.indexOf(ignoredPath) > -1
  })
  if (containsIgnoredPath) {
    return false
  }
  return true
}

console.log('Building intermediate extension for the addon store...')
fs.copySync(SRC_DIR, ADDON_STORE_INTERMEDIATE_BUILD_DIR, { filter: filterCopiedFiles })

// Make the final manifest.
execSync(`cat ${SRC_DIR}manifest.json ${SRC_DIR}manifest.addon-store-overrides.json | json --deep-merge > ${path.join(ADDON_STORE_INTERMEDIATE_BUILD_DIR, 'manifest.json')}`)

console.log('Building intermediate self-hosted extension...')
fs.copySync(SRC_DIR, SELF_HOSTED_INTERMEDIATE_BUILD_DIR, { filter: filterCopiedFiles })

// Make the final manifest.
execSync(`cat ${SRC_DIR}manifest.json ${SRC_DIR}manifest.self-hosted-overrides.json | json --deep-merge > ${path.join(SELF_HOSTED_INTERMEDIATE_BUILD_DIR, 'manifest.json')}`)

// Build the shared code and add it to the built extension.
execSync('yarn run shared:build')
fs.copySync(SHARED_CODE_BUILD_DIR, ADDON_STORE_INTERMEDIATE_BUILD_DIR)
fs.copySync(SHARED_CODE_BUILD_DIR, SELF_HOSTED_INTERMEDIATE_BUILD_DIR)

console.log('Making final extension builds.')
execSync(`web-ext build --source-dir=${ADDON_STORE_INTERMEDIATE_BUILD_DIR} -a ${BUILD_DIR}addon-store --overwrite-dest`)
execSync(`web-ext build --source-dir=${SELF_HOSTED_INTERMEDIATE_BUILD_DIR} -a ${BUILD_DIR}self-hosted --overwrite-dest`)
