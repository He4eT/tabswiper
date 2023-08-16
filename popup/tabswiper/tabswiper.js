/* https://png-pixel.com/ */
const defaultFavicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='

/* */

const state = {
  tabs: [],
  skipped: [],
  currentTab: null,
}

const getCurrentState = () => state

/* */

const updateState = () =>
  updateTabs()
    .then(updateCurrent)
    .then(updateInterface)

const updateTabs = () =>
  browser.tabs.query({ currentWindow: true })
    .then((tabs) => tabs.reverse())
    .then((tabs) => void (state.tabs = tabs))

const updateCurrent = () => {
  const untouchedTabs = state.tabs
    .filter(({ id }) => state.skipped.includes(id) === false)
  state.currentTab = untouchedTabs[0] ?? null
}

/* */

const keepTab = (tab) => {
  state.skipped.push(tab.id)
  updateState()
}

const goToTab = (tab) => {
  browser.tabs.update(tab.id, { active: true })
    .then(updateState)
}

const closeTab = (tab) => {
  browser.tabs.remove(tab.id)
    .then(updateState)
}

/* */

const setDOMListeners = (getCurrentState) => {
  /* UI controls with handlers. */

  const controls = [
    ['buttonClose', closeTab],
    ['buttonKeep', keepTab],
    ['linkTab', goToTab],
  ]

  controls.forEach(([elementId, handler]) => {
    document.getElementById(elementId).addEventListener('click', (e) => {
      e.preventDefault()
      handler(getCurrentState().currentTab)
    })
  })

  /* Keyboard handlers. */
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'j':
      case 'ArrowLeft':
        closeTab(getCurrentState().currentTab)
        return
      case 'k':
      case 'ArrowRight':
        keepTab(getCurrentState().currentTab)
        return
      case 'f':
        goToTab(getCurrentState().currentTab)
        return
      case 'r':
        location.reload()
        return
    }
  })

  /* Replace unavalible favicon with default one. */
  document.getElementById('favicon').addEventListener('error', (e) => {
    e.currentTarget.src = defaultFavicon
  })

  /* Close popup when tab switched. */
  browser.tabs.onActivated.addListener(() => {
    window.close()
  })
}

const updateInterface = () => {
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
  const items = [
    ['favicon', 'src', state.currentTab.favIconUrl ?? defaultFavicon],
    ['titleTab', 'textContent', state.currentTab.title],
    ['linkTab', 'textContent', state.currentTab.url],
    ['linkTab', 'href', state.currentTab.url],
    ['tabTotalNumber', 'textContent', state.tabs.length],
    ['tabNumber', 'textContent', state.tabs.length - state.tabs.findIndex(({ id }) =>
      id === state.currentTab.id
    )],
  ]

  items.forEach(([elementId, property, value]) => {
    document.getElementById(elementId)[property] = value
  })
}

/* */

// const state = initState({onUpdate: updateInterface})
// setDomListeners(state)

const init = () => {
  updateState()
  setDOMListeners(getCurrentState)
}

init()
