document.addEventListener('DOMContentLoaded', function() {redirect();});

function redirect(){
  var url = 'http://tab.gladly.io/newtab/?browser=chrome';

  // Add the extension version to the URL if we have it.
  var version;
  if(typeof ( chrome.runtime.getManifest ) == 'function'){
      var manifest = chrome.runtime.getManifest();
      version = manifest.version;
  }
  if (version) {
    url += '&v=' + version;
  }

  // iframe the TFAC new tab page.
  iframe = document.createElement('iframe');
  iframe.setAttribute('src', url);
  iframe.setAttribute('id', 'newtab-iframe');
  document.body.appendChild(iframe);
}
