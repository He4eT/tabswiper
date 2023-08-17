export const attachClickHandlers = (store) => {
  const controls = [
    ['currentTab', store.actions.goToTab],
    ['buttonClose', store.actions.closeTab],
    ['buttonShow', store.actions.goToTab],
    ['buttonSkip', store.actions.keepTab],
  ]

  controls.forEach(([elementId, handler]) => {
    document.getElementById(elementId).addEventListener('click', (e) => {
      e.preventDefault()
      handler(store.getCurrentState().currentTab)
    })
  })
}

