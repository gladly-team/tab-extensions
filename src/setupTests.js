/* eslint-env jest */

// Used in package.json Jest configuration
// and run before tests
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}

// Mock Chrome extension APIs
global.chrome = {
  commands: {
    onCommand: {
      addListener: jest.fn()
    }
  },
  runtime: {
    onInstalled: {
      addListener: jest.fn()
    },
    OnInstalledReason: {
      INSTALL: 'install',
      UPDATE: 'update',
      CHROME_UPDATE: 'chrome_update',
      SHARED_MODULE_UPDATE: 'shared_module_update'
    },
    setUninstallURL: jest.fn()
  },
  tabs: {
    create: jest.fn(),
    onCreated: {
      addListener: jest.fn()
    },
    onUpdated: {
      addListener: jest.fn()
    }
  },
  action: {
    onClicked: {
      addListener: jest.fn()
    }
  }
}

// Mock Firefox extension APIs
global.browser = {
  commands: {
    onCommand: {
      addListener: jest.fn()
    }
  },
  runtime: {
    onInstalled: {
      addListener: jest.fn()
    },
    OnInstalledReason: {
      INSTALL: 'install',
      UPDATE: 'update',
      BROWSER_UPDATE: 'browser_update',
      SHARED_MODULE_UPDATE: 'shared_module_update'
    },
    setUninstallURL: jest.fn()
  },
  tabs: {
    create: jest.fn()
  },
  // Manifest V2-only property
  // Manifest V3 replaces this with `action`
  browserAction: {
    onClicked: {
      addListener: jest.fn()
    }
  }
}
