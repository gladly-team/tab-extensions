/* globals chrome */

// https://developer.chrome.com/extensions/runtime#event-onInstalled
chrome.runtime.onInstalled.addListener(function (object) {
  try {
    // On install, open a welcome tab.
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      const postInstallURL = 'https://tab.gladly.io/newtab/first-tab/'
      chrome.tabs.create({ url: postInstallURL })
    }
  } catch (e) {
    console.error(e)
  }
})

// https://developer.chrome.com/docs/extensions/reference/action/#event-onClicked
chrome.action.onClicked.addListener(function (tab) {
  try {
    chrome.tabs.create({})
  } catch (e) {
    console.error(e)
  }
})

// On uninstall, open a post-uninstall page to get feedback.
// https://developer.chrome.com/extensions/runtime#method-setUninstallURL
try {
  const postUninstallURL = 'https://tab.gladly.io/newtab/uninstalled/'
  chrome.runtime.setUninstallURL(postUninstallURL)
} catch (e) {
  console.error(e)
}
