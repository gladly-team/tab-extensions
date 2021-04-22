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

// On uninstall, open a post-uninstall page to get feedback.
// https://developer.chrome.com/extensions/runtime#method-setUninstallURL
try {
  const postUninstallURL = 'https://tab.gladly.io/newtab/uninstalled/'
  chrome.runtime.setUninstallURL(postUninstallURL)
} catch (e) {
  console.error(e)
}

// Listen for new tabs.
const NEW_TAB_URL = 'http://tab.gladly.io/newtab/'
chrome.tabs.onCreated.addListener(async (tab) => {
  console.log('created tab', tab)
  // TODO
  // Check if this is a blank new tab (not opened by clicking a link).
  // var isBlankTab = tab.url === 'chrome://newtab/'
  // const isBlankTab = true

  // if (isBlankTab) {
  //   // Redirect to Tab for a Cause new tab page.
  //   await chrome.tabs.update(tab.id, { url: NEW_TAB_URL })
  // }

  // Redirect to Tab for a Cause new tab page.
  const updatedTab = await chrome.tabs.update(tab.id, { url: NEW_TAB_URL })
  console.log('updated tab', updatedTab)
})
