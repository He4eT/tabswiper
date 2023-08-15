/* */

const state = {
  tabs: [],
  skipped: [],
  currentTab: null,
}

const updateState = () =>
  updateTabs()
    .then(updateCurrent)
    .then(updateInterface)

const updateTabs = () =>
  browser.tabs.query({currentWindow: true})
    .then((tabs) => tabs.reverse())
    .then((tabs) => void (state.tabs = tabs))

const updateCurrent = () => {
  const filteredTabs = state.tabs
    .filter(({ id }) => state.skipped.includes(id) === false)
  state.currentTab = filteredTabs[0] ?? null
}

const keepTab = (tab) => {
  state.skipped.push(tab.id)
  updateState()
}

const goToTab = (tab) => {
  browser.tabs.update(tab.id, { active: true })
  updateState()
}

const closeTab = (tab) => {
  browser.tabs.remove(tab.id)
  updateState()
}

/* */

const setDOMListeners = () => {
  const pairs = [
    ['buttonClose', closeTab],
    ['buttonKeep', keepTab],
    ['linkTab', goToTab],
  ]

  pairs.forEach(([elementId, handler]) => {
    document.getElementById(elementId).addEventListener('click', (e) => {
      console.log('Element:', elementId, 'Handler:', handler)
      e.preventDefault()
      handler(state.currentTab)
    })
  })
}

const updateInterface = () => {
  console.log(state)

  if (state.currentTab === null) {
    location.reload()
    return
  }

  const items = [
    ['titleTab', 'textContent', state.currentTab.title],
    ['linkTab', 'textContent', state.currentTab.url],
    ['linkTab', 'href', state.currentTab.url],
  ]

  items.forEach(([elementId, property, value]) => {
    document.getElementById(elementId)[property] = value
  })
}

/* */

const init = () =>
  updateState()
    .then(setDOMListeners)
    // .then(setKeyboardListeners)
    // .then(setBrowserListeners)

init()
