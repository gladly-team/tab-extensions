# Tab for a Cause Browser Extensions
The easiest way to do good every day! Join in: [tab.gladly.io](https://tab.gladly.io/)

## Browser Support

#### 🟢 &nbsp; [Chrome](https://chrome.google.com/webstore/detail/tab-for-a-cause/gibkoahgjfhphbmeiphbcnhehbfdlcgo)

#### 🟢 &nbsp; [Edge](https://microsoftedge.microsoft.com/addons/detail/tab-for-a-cause/hmiiajmhelfgiaoboffbjpjdckbmnddg)

#### 🟡 &nbsp; Safari
* Development in progress. Check back soon!

#### ❌ &nbsp; Firefox
* The Firefox team has chosen to restrict new tab page functionality. See issue [#31](https://github.com/gladly-team/tab-extensions/issues/31).
* You can build the extension from source (from this repo) and load it locally.

#### ❌ &nbsp; Opera
* Opera [does not allow](https://dev.opera.com/extensions/acceptance-criteria/) extensions to change the new tab page.
* You can build the extension from source (from this repo) and load it locally.

**We aim to support every major browser.** We continue to advocate for change in the browsers that restrict new tab page functionality, because we believe everybody should be able to raise money for charity as they browse the web.

## Developers

### Getting Started

* Install [Yarn](https://yarnpkg.com/en/)
* Clone this repository
* At the root of the repository, run `yarn`

### Developing

#### Chrome
* `yarn run chromium:develop`
* At `chrome://extensions/`, check the "Developer mode" box and load the unpacked extension from `build/chromium/`.
* The extension will re-build on file change. You still should manually reload the extension in Chrome.

#### Edge
* `yarn run edge:build`
* At `edge://extensions/`, check the "Developer mode" box and load the unpacked extension from `build/edge/`.
* Manually run the build script after making changes.

#### Safari
* Use Xcode to develop and build.
* On build, it will add the extension to Safari and prompt you to enable it.

#### Firefox
* `yarn run firefox:develop`
* This opens an instance of Firefox with the extension installed. It will hot reload on changes.

#### Opera
* `yarn run opera:build`
* At `opera://extensions/`, check the "Developer mode" box and load the unpacked extension from `build/opera/`.
* Manually run the build script after making changes.

### Distributing

#### Chrome and Edge

Upload the built archives in the browsers' developer dashboards.

#### Safari

In XCode, create an archive and distribute it to the App Store.

#### Firefox

Upload the built archive in the developer dashboard.

When submitting to the Firefox Add-ons Store, we need to provide source code for review (see [docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Source_Code_Submission)). To do so:

1. Download this repository as a .zip file
2. In the Add-ons Developer Hub, upload the .zip file as "Source code" when releasing a new version
3. Paste the following instructions for the reviewer to build from source
```
Instructions for the reviewer to build from source:
1. Go to https://github.com/gladly-team/tab-extensions, click "Clone or download", and click "Download ZIP".
2. Unzip the source code file and navigate to the root of the source code directory.
3. Install Yarn (https://yarnpkg.com/en/).
4. Run `yarn` to install dependencies.
5. Run `yarn run firefox:build`. The built extension will be in `./build/firefox/`.
