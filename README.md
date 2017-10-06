# Tab for a Cause Browser Extensions

## Getting Started

* Install [Yarn](https://yarnpkg.com/en/)
* Clone this repository
* At the root of the repository, run `yarn`

## Developing

### Chrome
* `yarn run chromium:develop`
* At chrome://extensions/, check the "Developer mode" box and load the unpacked extension from the repository's `build/chromium/` directory.
* The extension will re-build on file change but still requires manually reloading the extension in Chrome.

### Firefox
* `yarn run firefox:develop`
* This opens an instance of Firefox with the extension installed. It will hot reload on changes.

## Building

### All Browsers
`yarn run build`

### Chrome
`yarn run chromium:build`

### Firefox
`yarn run firefox:build`

Note: we maintain two Firefox extensions: one that is listed in the Mozilla Add-ons Store and one that is self-hosted for download from our web page. This builds both. The extensions only differ in some manifest.json entries; see `manifest.addon-store-overrides.json` and `manifest.self-hosted-overrides.json`. We build the final manifest.json files in the Firefox build script.

## Testing
`yarn test`
