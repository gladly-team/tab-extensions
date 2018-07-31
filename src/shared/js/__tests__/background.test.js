/* eslint-env jest */
/* globals document */

beforeEach(() => {
  jest.resetModules()
  jest.clearAllMocks()
})

function getDocHTML () {
  return '' +
    "<div id='user-background'></div>" +
    "<div id='background-tint'></div>"
}

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

  test('showBackgroundColor works as expected', () => {
    // Set up our document body
    document.body.innerHTML = getDocHTML()
    const bkgElem = document.getElementById('user-background')
    expect(bkgElem.style.background).toBe('')
    const showBackgroundColor = require('../background').showBackgroundColor
    showBackgroundColor('#FF0000')

    // Background
    expect(bkgElem.style.background).toBe('rgb(255, 0, 0)')
    expect(bkgElem.style.opacity).toEqual('1')

    // Background tint
    const bkgTintElem = document.getElementById('background-tint')
    expect(bkgTintElem.style.backgroundColor).toEqual('rgba(0, 0, 0, 0.03)')
    expect(bkgTintElem.style.opacity).toEqual('1')
  })

  test('showBackgroundImg works as expected', () => {
    // Set up our document body
    document.body.innerHTML = getDocHTML()

    // Mock that the image loads immediately.
    global.Image = () => ({
      addEventListener: (name, onLoadCallback) => {
        if (name === 'load') {
          onLoadCallback()
        }
      }
    })

    const showBackgroundImg = require('../background').showBackgroundImg
    const fakeImgSrc = 'http://example.com/my-img.png'
    showBackgroundImg(fakeImgSrc)

    // Check style of background element.
    const bkgElem = document.getElementById('user-background')
    expect(bkgElem.style.backgroundImage).toEqual('url(http://example.com/my-img.png)')
    expect(bkgElem.style.opacity).toEqual('1')

    //  Background tint
    const bkgTintElem = document.getElementById('background-tint')
    expect(bkgTintElem.style.backgroundColor).toEqual('rgba(0, 0, 0, 0.15)')
    expect(bkgTintElem.style.opacity).toEqual('1')
  })
})
