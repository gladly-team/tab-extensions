/* eslint-env jest */
/* globals document */

beforeEach(() => {
  jest.resetModules()
  jest.clearAllMocks()
})

describe('background in extension new tab page', () => {
  test('getBackgroundSettings calls localStorage as expected', () => {
    jest.mock('../localstorage-mgr', () => {
      return {
        getItem: (item) => {
          switch (item) {
            case 'tabExt.user.background.option':
              return 'photo'
            case 'tabExt.user.background.customImage':
              return 'http://foo.com/tree.png'
            case 'tabExt.user.background.color':
              return '#CDCDCD'
            case 'tabExt.user.background.imageURL':
              return 'http://example.com/my-img.png'
            default:
              return null
          }
        },
        setItem: jest.fn()
      }
    })
    const getBackgroundSettings = require('../background').getBackgroundSettings
    const settings = getBackgroundSettings()
    expect(settings).toEqual({
      backgroundOption: 'photo',
      customImage: 'http://foo.com/tree.png',
      backgroundColor: '#CDCDCD',
      imageURL: 'http://example.com/my-img.png'
    })
  })

  test('updateBackgroundSettings calls localStorage as expected', () => {
    jest.mock('../localstorage-mgr', () => {
      return {
        getItem: jest.fn(),
        setItem: jest.fn()
      }
    })
    const localStorageMgr = require('../localstorage-mgr')
    const fakeSettings = {
      backgroundOption: 'color',
      customImage: 'http://foo.com/tree.png',
      backgroundColor: '#CDCDCD',
      imageURL: 'http://example.com/my-img.png'
    }
    const updateBackgroundSettings = require('../background').updateBackgroundSettings
    updateBackgroundSettings(fakeSettings)
    expect(localStorageMgr.setItem.mock.calls).toEqual([
      ['tabExt.user.background.option', 'color'],
      ['tabExt.user.background.customImage', 'http://foo.com/tree.png'],
      ['tabExt.user.background.color', '#CDCDCD'],
      ['tabExt.user.background.imageURL', 'http://example.com/my-img.png']
    ])
  })

  // TODO
  test('showBackgroundColor works as expected', () => {
  })

  // TODO
  test('showBackgroundImg works as expected', () => {
  })
})
