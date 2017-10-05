/* eslint-env jest */

const manifest = require('../manifest.json')
const manifestAddonStore = require('../manifest.addon-store-overrides.json')
const manifestSelfHosted = require('../manifest.self-hosted-overrides.json')

// Tests to avoid accidentally requesting new permissions.

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

test('addon store manifest overrides are as expected', () => {
  expect(manifestAddonStore).toEqual({
    'applications': {
      'gecko': {
        'id': 'tabforacause@tabforacause.org',
        'strict_min_version': '56.0a1'
      }
    }
  })
})

test('self-hosted manifest overrides are as expected', () => {
  expect(manifestSelfHosted).toEqual({
    'applications': {
      'gecko': {
        'id': 'contact@tabforacause.org',
        'strict_min_version': '56.0a1',
        'update_url': 'https://tab.gladly.io/firefox/update.json'
      }
    }
  })
})

// Basic display tests.

test('extension name is correct', () => {
  expect(manifest['name']).toBe('Tab for a Cause')
})
