/* eslint-env jest */

const manifest = require('../manifest.json')

// Tests to avoid accidentally requesting new permissions.
// https://developer.chrome.com/extensions/permission_warnings

test('manifest permissions have not changed', () => {
  var permissions = manifest['permissions']
  expect(permissions).toEqual(['tabs'])
})

test('content script permissions have not changed', () => {
  expect(manifest['content_scripts']).toBeUndefined()
})

test('manifest does not extend devtools', () => {
  expect(manifest['devtools_page']).toBeUndefined()
})

test('manifest does not use plugins', () => {
  expect(manifest['plugins']).toBeUndefined()
})

// Test extension updating URL.

test('extension update URL is set to Chrome Web Store', () => {
  var updateEndpoint = 'http://clients2.google.com/service/update2/crx'
  expect(manifest['update_url']).toBe(updateEndpoint)
})

// Basic display tests.

test('extension name is correct', () => {
  expect(manifest['name']).toBe('Tab for a Cause')
})
