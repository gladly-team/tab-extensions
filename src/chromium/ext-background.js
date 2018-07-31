/* globals chrome */

// https://developer.chrome.com/extensions/runtime#event-onInstalled
chrome.runtime.onInstalled.addListener(function (object) {
  // On install, open a welcome tab.
  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    const postInstallURL = 'https://tab.gladly.io/newtab/first-tab/'
    chrome.tabs.create({ url: postInstallURL })
  }
})
