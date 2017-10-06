
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
  console.log('Updating background image settings', settings)
  localStorageMgr.setItem(STORAGE_BACKGROUND_OPTION, settings.backgroundOption)
  localStorageMgr.setItem(STORAGE_BACKGROUND_CUSTOM_IMAGE, settings.customImage)
  localStorageMgr.setItem(STORAGE_BACKGROUND_COLOR, settings.backgroundColor)
  localStorageMgr.setItem(STORAGE_BACKGROUND_IMAGE_URL, settings.imageURL)
}

export const showBackgroundColor = (color) => {
  console.log('Showing background color', color)
  const bkgElem = document.getElementById('user-background')
  bkgElem.style.background = color
}

// TODO
export const showBackgroundImg = (imgSrc) => {
  console.log('Showing background image', imgSrc)
}
