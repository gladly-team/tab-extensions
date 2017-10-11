
import {
  POST_MESSAGE_TYPE_BACKGROUND_SETTINGS
} from './constants'
import {
  updateBackgroundSettings
} from './background'

// Handle messages from webpage.

var trustedOrigins = [
  'http://tab.gladly.io',
  'https://tab.gladly.io',
  'http://www.tabforacause.org',
  'https://www.tabforacause.org',
  'http://gladly.io',
  'https://gladly.io',
  // Used in development
  'http://localhost:3000',
  'http://test-tab2017.gladly.io',
  'https://test-tab2017.gladly.io',
  'http://dev-tab2017.gladly.io',
  'https://dev-tab2017.gladly.io',
  'http://prod-tab2017.gladly.io',
  'https://prod-tab2017.gladly.io'
]

// Called sometime after postMessage is called
function receiveMessage (event) {
  // Make sure we trust the sender.
  if (trustedOrigins.indexOf(event.origin) === -1) {
    console.error(`Received message from untrusted domain: ${event.origin}`)
    return
  }
  switch (event.data.type) {
    case POST_MESSAGE_TYPE_BACKGROUND_SETTINGS:
      updateBackgroundSettings(event.data.data)
      break
    default:
  }
}

// Listen for messages from the web app.
export const addListener = () => {
  try {
    window.addEventListener('message', receiveMessage, false)
  } catch (e) {
    console.error(e)
  }
}
