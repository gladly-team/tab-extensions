/* eslint-env jest */

const manifest = require('../manifest.json')

// Tests to avoid accidentally requesting new permissions.
// https://developer.chrome.com/extensions/permission_warnings

test('manifest permissions have not changed', () => {
  var permissions = manifest['permissions']
  expect(permissions).toEqual([])
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

// Tests action property exists
// Action key must exist in manifest to use chrome.action API
// https://developer.chrome.com/docs/extensions/reference/action/#manifest

test('action property exists', () => {
  expect(manifest['action']).toBeTruthy()
})

// Basic display tests.

test('extension name is correct', () => {
  expect(manifest['name']).toBe('Tab for a Cause')
})
