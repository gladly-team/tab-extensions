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
