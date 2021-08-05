/* globals browser */

const NEW_TAB_URL = 'http://tab.gladly.io/newtab/'
try {
  browser.tabs.getCurrent((tab) => {
    // The URL will not be highlighted, unfortunately, at least
    // as of Firefox v91. See issues:
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1460412
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1409675
    browser.tabs.update(tab.id, { url: NEW_TAB_URL })
  })
} catch (e) {
  // Fall back to client-side navigation.
  document.location.href = NEW_TAB_URL
}
