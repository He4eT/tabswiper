import * as tabswiperStore from './modules/store.js'

import { attachClickHandlers } from './modules/clickHandlers.js'
import { attachKeyboardHandlers } from './modules/keyboardHandlers.js'
import { enableFaviconFallback, updateInterface } from './modules/dom.js'

const store = tabswiperStore.init({
  tabs: browser.tabs,
  onStateUpdate: (state) => {
    /* Close popup if there ara no tabs. */
    if (state.tabs.length === 0) {
      window.close()
      return
    }

    /* Start over when all tabs skipped. */
    if (state.currentTab === null) {
      location.reload()
      return
    }

    /* Update UI. */
    updateInterface(state)
  },
})

/* Attach UI handlers. */
attachClickHandlers(store)
attachKeyboardHandlers(store)

/* Replace unavalible favicon with default one. */
enableFaviconFallback()

/* Close popup when tab switched. */
browser.tabs.onActivated.addListener(() => {
  window.close()
})
