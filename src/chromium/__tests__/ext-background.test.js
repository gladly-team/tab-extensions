/* eslint-env jest */
/* globals chrome */

afterEach(() => {
  jest.clearAllMocks()
  jest.resetModules()
})

test('opens a welcome tab on install', () => {
  require('../ext-background')

  // Mock the onInstalled event
  const onInstalledCallback = chrome.runtime.onInstalled.addListener.mock.calls[0][0]
  onInstalledCallback({
    reason: 'install',
    id: 'abc-123'
  })
  expect(chrome.tabs.create).toHaveBeenCalledWith({
    url: 'https://tab.gladly.io/newtab/first-tab/'
  })
})

test('does not open a tab on extension update', () => {
  require('../ext-background')

  // Mock the onInstalled event
  const onInstalledCallback = chrome.runtime.onInstalled.addListener.mock.calls[0][0]
  onInstalledCallback({
    reason: 'update',
    previousVersion: '5.18'
  })
  expect(chrome.tabs.create).not.toHaveBeenCalled()
})

test('gracefully handles any error with opening the welcome page', () => {
  require('../ext-background')

  chrome.tabs.create.mockImplementationOnce(() => {
    throw new Error('Whoops!')
  })

  // Suppress expected console error.
  jest.spyOn(console, 'error').mockImplementationOnce(() => {})

  // Mock the onInstalled event
  const onInstalledCallback = chrome.runtime.onInstalled.addListener.mock.calls[0][0]
  onInstalledCallback({
    reason: 'install',
    previousVersion: '5.18'
  })
})

test('sets the post-uninstall URL', () => {
  require('../ext-background')
  expect(chrome.runtime.setUninstallURL)
    .toHaveBeenCalledWith('https://tab.gladly.io/newtab/uninstalled/')
})

test('gracefully handles errors with setting the post-uninstall URL', () => {
  chrome.runtime.setUninstallURL.mockImplementationOnce(() => {
    throw new Error('Whoops!')
  })

  // Suppress expected console error.
  jest.spyOn(console, 'error').mockImplementationOnce(() => {})

  // Should not throw.
  require('../ext-background')
})
