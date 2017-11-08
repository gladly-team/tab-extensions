/* globals Image */

import {
  STORAGE_BACKGROUND_OPTION,
  STORAGE_BACKGROUND_CUSTOM_IMAGE,
  STORAGE_BACKGROUND_COLOR,
  STORAGE_BACKGROUND_IMAGE_URL
} from './constants'
import localStorageMgr from './localstorage-mgr'

export const getBackgroundSettings = () => {
  return {
    backgroundOption: localStorageMgr.getItem(STORAGE_BACKGROUND_OPTION),
    customImage: localStorageMgr.getItem(STORAGE_BACKGROUND_CUSTOM_IMAGE),
    backgroundColor: localStorageMgr.getItem(STORAGE_BACKGROUND_COLOR),
    imageURL: localStorageMgr.getItem(STORAGE_BACKGROUND_IMAGE_URL)
  }
}

// Update background settings.
export const updateBackgroundSettings = (settings) => {
  localStorageMgr.setItem(STORAGE_BACKGROUND_OPTION, settings.backgroundOption)
  localStorageMgr.setItem(STORAGE_BACKGROUND_CUSTOM_IMAGE, settings.customImage)
  localStorageMgr.setItem(STORAGE_BACKGROUND_COLOR, settings.backgroundColor)
  localStorageMgr.setItem(STORAGE_BACKGROUND_IMAGE_URL, settings.imageURL)
}

export const showBackgroundColor = (color) => {
  const bkgElem = document.getElementById('user-background')
  const bkgTintElem = document.getElementById('background-tint')
  bkgElem.style.background = color
  bkgElem.style.opacity = '1'
  bkgTintElem.style.backgroundColor = 'rgba(0, 0, 0, 0.03)'
  bkgTintElem.style.visibility = 'visible'
  bkgTintElem.style.opacity = '1'
}

export const showBackgroundImg = (imgSrc) => {
  const img = new Image()
  img.addEventListener('load', function () {
    const bkgElem = document.getElementById('user-background')
    const bkgTintElem = document.getElementById('background-tint')
    bkgElem.style.backgroundImage = `url(${imgSrc})`
    bkgElem.style.opacity = '1'
    bkgTintElem.style.backgroundColor = 'rgba(0, 0, 0, 0.15)'
    bkgTintElem.style.visibility = 'visible'
    bkgTintElem.style.opacity = '1'
  })
  img.src = imgSrc
}
