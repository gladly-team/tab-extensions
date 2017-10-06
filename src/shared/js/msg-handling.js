
import {
  POST_MESSAGE_TYPE_BACKGROUND_SETTINGS
} from './constants'
import {
  updateBackgroundSettings
} from './background'

// Handle messages from webpage.

var trustedOrigins = [
  'http://localhost:3000', // dev
  'http://tab.gladly.io',
  'https://tab.gladly.io',
  'http://www.tabforacause.org',
  'https://www.tabforacause.org',
  'http://gladly.io',
  'https://gladly.io'
]

// Called sometime after postMessage is called
function receiveMessage (event) {
  // Make sure we trust the sender.
  console.log(event.origin)
  if (trustedOrigins.indexOf(event.origin) === -1) {
    console.error(`Received message from untrusted domain: ${event.origin}`)
    return
  }
  switch (event.data.type) {
    case POST_MESSAGE_TYPE_BACKGROUND_SETTINGS:
      console.log('Updating background settings', event)
      updateBackgroundSettings(event.data.data)
      break
    default:
  }
}

// Listen for messages from the web app.
export const addListener = () => {
  window.addEventListener('message', receiveMessage, false)
}
