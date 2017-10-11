/* eslint-env jest */

jest.mock('../background')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('background rendering in extension new tab page', () => {
  it('renders the correct background option for photo', () => {
    const backgroundMock = require('../background')
    backgroundMock.getBackgroundSettings = jest.fn(() => {
      return {
        backgroundOption: 'photo',
        customImage: null,
        backgroundColor: null,
        imageURL: 'http://example.com/my-img.png'
      }
    })
    const renderBackground = require('../render-background').default
    renderBackground()
    expect(backgroundMock.showBackgroundImg)
      .toHaveBeenCalledWith('http://example.com/my-img.png')
  })

  it('renders the correct background option for custom photo', () => {
    const backgroundMock = require('../background')
    backgroundMock.getBackgroundSettings = jest.fn(() => {
      return {
        backgroundOption: 'custom',
        customImage: 'http://example.com/something.png',
        backgroundColor: null,
        imageURL: null
      }
    })
    const renderBackground = require('../render-background').default
    renderBackground()
    expect(backgroundMock.showBackgroundImg)
      .toHaveBeenCalledWith('http://example.com/something.png')
  })

  it('renders the correct background option for daily photo', () => {
    const backgroundMock = require('../background')
    backgroundMock.getBackgroundSettings = jest.fn(() => {
      return {
        backgroundOption: 'photo',
        customImage: null,
        backgroundColor: null,
        imageURL: 'http://example.com/an-img.png'
      }
    })
    const renderBackground = require('../render-background').default
    renderBackground()
    expect(backgroundMock.showBackgroundImg)
      .toHaveBeenCalledWith('http://example.com/an-img.png')
  })

  it('renders the correct background option for color background', () => {
    const backgroundMock = require('../background')
    backgroundMock.getBackgroundSettings = jest.fn(() => {
      return {
        backgroundOption: 'color',
        customImage: null,
        backgroundColor: '#FFFF00',
        imageURL: 'http://example.com/whatever.png'
      }
    })
    const renderBackground = require('../render-background').default
    renderBackground()
    expect(backgroundMock.showBackgroundColor)
      .toHaveBeenCalledWith('#FFFF00')
  })

  it('does not render when the background option is not set', () => {
    const backgroundMock = require('../background')
    backgroundMock.getBackgroundSettings = jest.fn(() => {
      return {
        backgroundOption: null,
        customImage: null,
        backgroundColor: null,
        imageURL: null
      }
    })
    const renderBackground = require('../render-background').default
    renderBackground()
    expect(backgroundMock.showBackgroundColor)
      .not.toHaveBeenCalled()
    expect(backgroundMock.showBackgroundImg)
      .not.toHaveBeenCalled()
  })

  it('does not render when the custom image is missing', () => {
    const backgroundMock = require('../background')
    backgroundMock.getBackgroundSettings = jest.fn(() => {
      return {
        backgroundOption: 'custom',
        customImage: null,
        backgroundColor: null,
        imageURL: null
      }
    })
    const renderBackground = require('../render-background').default
    renderBackground()
    expect(backgroundMock.showBackgroundColor)
      .not.toHaveBeenCalled()
    expect(backgroundMock.showBackgroundImg)
      .not.toHaveBeenCalled()
  })

  it('does not render when the color is missing', () => {
    const backgroundMock = require('../background')
    backgroundMock.getBackgroundSettings = jest.fn(() => {
      return {
        backgroundOption: 'color',
        customImage: null,
        backgroundColor: null,
        imageURL: null
      }
    })
    const renderBackground = require('../render-background').default
    renderBackground()
    expect(backgroundMock.showBackgroundColor)
      .not.toHaveBeenCalled()
    expect(backgroundMock.showBackgroundImg)
      .not.toHaveBeenCalled()
  })

  it('does not render when the daily image is missing', () => {
    const backgroundMock = require('../background')
    backgroundMock.getBackgroundSettings = jest.fn(() => {
      return {
        backgroundOption: 'daily',
        customImage: null,
        backgroundColor: null,
        imageURL: null
      }
    })
    const renderBackground = require('../render-background').default
    renderBackground()
    expect(backgroundMock.showBackgroundColor)
      .not.toHaveBeenCalled()
    expect(backgroundMock.showBackgroundImg)
      .not.toHaveBeenCalled()
  })

  it('does not render when the image is missing', () => {
    const backgroundMock = require('../background')
    backgroundMock.getBackgroundSettings = jest.fn(() => {
      return {
        backgroundOption: 'photo',
        customImage: null,
        backgroundColor: null,
        imageURL: null
      }
    })
    const renderBackground = require('../render-background').default
    renderBackground()
    expect(backgroundMock.showBackgroundColor)
      .not.toHaveBeenCalled()
    expect(backgroundMock.showBackgroundImg)
      .not.toHaveBeenCalled()
  })
})
