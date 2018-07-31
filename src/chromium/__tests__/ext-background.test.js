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
