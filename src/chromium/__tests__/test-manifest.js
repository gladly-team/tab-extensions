
const manifest = require('../manifest.json');

// Tests to avoid accidentally requesting new permissions.
// https://developer.chrome.com/extensions/permission_warnings

test('manifest permissions have not changed', () => {
  var permissions = manifest['permissions'];
  expect(permissions).toEqual(['tabs']);
});

test('content script permissions have not changed', () => {
  var permissions = manifest['content_scripts'];
  expect(permissions).toBeUndefined();
});

