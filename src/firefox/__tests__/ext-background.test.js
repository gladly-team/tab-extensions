/* eslint-env jest */
/* globals browser */

afterEach(() => {
  jest.clearAllMocks()
  jest.resetModules()
})

test('opens a welcome tab on install', () => {
  require('../ext-background')

  // Mock the onInstalled event
  const onInstalledCallback = browser.runtime.onInstalled.addListener.mock.calls[0][0]
  onInstalledCallback({
    reason: 'install',
    id: 'abc-123'
  })
  expect(browser.tabs.create).toHaveBeenCalledWith({
    url: 'https://tab.gladly.io/newtab/first-tab/'
  })
})

test('does not open a tab on extension update', () => {
  require('../ext-background')

  // Mock the onInstalled event
  const onInstalledCallback = browser.runtime.onInstalled.addListener.mock.calls[0][0]
  onInstalledCallback({
    reason: 'update',
    previousVersion: '5.18'
  })
  expect(browser.tabs.create).not.toHaveBeenCalled()
})

test('gracefully handles any error with opening the welcome page', () => {
  require('../ext-background')

  browser.tabs.create.mockImplementationOnce(() => {
    throw new Error('Whoops!')
  })

  // Suppress expected console error.
  jest.spyOn(console, 'error').mockImplementationOnce(() => {})

  // Mock the onInstalled event
  const onInstalledCallback = browser.runtime.onInstalled.addListener.mock.calls[0][0]
  onInstalledCallback({
    reason: 'install',
    previousVersion: '5.18'
  })
})

test('sets the post-uninstall URL', () => {
  require('../ext-background')
  expect(browser.runtime.setUninstallURL)
    .toHaveBeenCalledWith('https://tab.gladly.io/newtab/uninstalled/')
})

test('gracefully handles errors with setting the post-uninstall URL', () => {
  browser.runtime.setUninstallURL.mockImplementationOnce(() => {
    throw new Error('Whoops!')
  })

  // Suppress expected console error.
  jest.spyOn(console, 'error').mockImplementationOnce(() => {})

  // Should not throw.
  require('../ext-background')
})
