
browser.runtime.onInstalled.addListener(({ reason }) => {
  const INSTALL = 'install'
  try {
    // On install, open a welcome tab.
    if (reason === INSTALL) {
      const postInstallURL = 'https://tab.gladly.io/newtab/first-tab/'
      browser.tabs.create({ url: postInstallURL })
    }
  } catch (e) {
    console.error(e)
  }
})

// `browser.runtime.setUninstallURL` is not currently supported in Safari.
