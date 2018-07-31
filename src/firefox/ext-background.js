/* globals browser */

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onInstalled
browser.runtime.onInstalled.addListener(function (object) {
  try {
    // On install, open a welcome tab.
    if (object.reason === browser.runtime.OnInstalledReason.INSTALL) {
      const postInstallURL = 'https://tab.gladly.io/newtab/first-tab/'
      browser.tabs.create({ url: postInstallURL })
    }
  } catch (e) {
    console.error(e)
  }
})

// On uninstall, open a post-uninstall page to get feedback.
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/setUninstallURL
try {
  const postUninstallURL = 'https://tab.gladly.io/newtab/uninstalled/'
  browser.runtime.setUninstallURL(postUninstallURL)
} catch (e) {
  console.error(e)
}
