
import {
  USER_BACKGROUND_OPTION_CUSTOM,
  USER_BACKGROUND_OPTION_COLOR,
  USER_BACKGROUND_OPTION_PHOTO,
  USER_BACKGROUND_OPTION_DAILY
} from './constants'

import {
  getBackgroundSettings,
  showBackgroundColor,
  showBackgroundImg
} from './background'

export default function () {
  const settings = getBackgroundSettings()
  if (!settings.backgroundOption) {
    return
  }

  switch (settings.backgroundOption) {
    case USER_BACKGROUND_OPTION_CUSTOM:
      if (settings.customImage) {
        showBackgroundImg(settings.customImage)
      }
      break
    case USER_BACKGROUND_OPTION_COLOR:
      if (settings.backgroundColor) {
        showBackgroundColor(settings.backgroundColor)
      }
      break
    case USER_BACKGROUND_OPTION_PHOTO:
      if (settings.imageURL) {
        showBackgroundImg(settings.imageURL)
      }
      break
    case USER_BACKGROUND_OPTION_DAILY:
      if (settings.imageURL) {
        showBackgroundImg(settings.imageURL)
      }
      break
    default:
  }
}
