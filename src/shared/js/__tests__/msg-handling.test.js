/* eslint-env jest */
/* globals Event */

jest.mock('../background')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('message handler', () => {
  it('updates background settings when receiving a message', () => {
    const msgHandler = require('../msg-handling')
    msgHandler.addListener()

    // Mock a postMessage event.
    const messageEvent = new Event('message')
    const mockMsgData = {
      type: 'background-settings',
      data: {
        foo: 'bar'
      }
    }
    messageEvent.origin = 'https://tab.gladly.io'
    messageEvent.data = mockMsgData
    window.dispatchEvent(messageEvent)

    const backgroundMock = require('../background')
    expect(backgroundMock.updateBackgroundSettings)
      .toHaveBeenCalledWith({
        foo: 'bar'
      })
  })

  it('fails when sent from an untrusted domain', () => {
    const msgHandler = require('../msg-handling')
    msgHandler.addListener()

    const mockConsoleError = jest.spyOn(console, 'error')
      .mockImplementationOnce(() => jest.fn())

    // Mock a postMessage event.
    const messageEvent = new Event('message')
    const mockMsgData = {
      type: 'background-settings',
      data: {
        foo: 'bar'
      }
    }
    messageEvent.origin = 'https://evil-domain.blog'
    messageEvent.data = mockMsgData
    window.dispatchEvent(messageEvent)

    const backgroundMock = require('../background')
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Received message from untrusted domain: https://evil-domain.blog')
    expect(backgroundMock.updateBackgroundSettings)
      .not.toHaveBeenCalledWith()
  })
})
