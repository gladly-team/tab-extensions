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
  console.log('Updating background settings:', settings)
  localStorageMgr.setItem(STORAGE_BACKGROUND_OPTION, settings.backgroundOption)
  localStorageMgr.setItem(STORAGE_BACKGROUND_CUSTOM_IMAGE, settings.customImage)
  localStorageMgr.setItem(STORAGE_BACKGROUND_COLOR, settings.backgroundColor)
  localStorageMgr.setItem(STORAGE_BACKGROUND_IMAGE_URL, settings.imageURL)
}

export const showBackgroundColor = (color) => {
  console.log(`Showing background color: ${color}`)
  const bkgElem = document.getElementById('user-background')
  bkgElem.style.background = color
  bkgElem.style.opacity = '1'
}

export const showBackgroundImg = (imgSrc) => {
  console.log(`Showing background image: ${imgSrc}`)
  const img = new Image()
  img.addEventListener('load', function () {
    const bkgElem = document.getElementById('user-background')
    // TODO: need to add inset shadow to sibling element.
    // bkgElem.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(' + imgSrc + ')'
    bkgElem.style.backgroundImage = `url(${imgSrc})`
    bkgElem.style.opacity = '1'
  })
  img.src = imgSrc
}
