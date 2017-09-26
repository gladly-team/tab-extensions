
const manifest = require('../manifest.json');

// Tests to avoid accidentally requesting new permissions.

test('manifest permissions have not changed', () => {
  var permissions = manifest['permissions'];
  expect(permissions).toEqual(['tabs']);
});

test('content script permissions have not changed', () => {
  expect(manifest['content_scripts']).toBeUndefined();
});

test('manifest does not extend devtools', () => {
  expect(manifest['devtools_page']).toBeUndefined();
});

test('manifest does not use plugins', () => {
  expect(manifest['plugins']).toBeUndefined();
});

// Basic display tests.

test('extension name is correct', () => {
  expect(manifest['name']).toBe('Tab for a Cause');
});
