
// Background pages: 
//   https://developer.chrome.com/extensions/background_pages
// Event pages:
//   https://developer.chrome.com/extensions/event_pages

var url = 'http://tab.gladly.io/newtab/';

// Listen for new tabs.
chrome.tabs.onCreated.addListener(function(tab) {

  // Check if this is a blank new tab (not opened by clicking a link).
  var isBlankTab = tab.url == 'chrome://newtab/';
  if (isBlankTab) {

    // Redirect to Tab for a Cause new tab page.
    chrome.tabs.update(tab.id, {url: url});
  }
});
