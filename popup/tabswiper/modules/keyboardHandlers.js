export const attachKeyboardHandlers = (store) => {
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'd':
      case 'ArrowLeft':
        store.actions.closeTab(store.getCurrentState().currentTab)
        return
      case 'k':
      case 'ArrowRight':
        store.actions.keepTab(store.getCurrentState().currentTab)
        return
      case 'f':
      case 'ArrowUp':
        store.actions.goToTab(store.getCurrentState().currentTab)
        return
      case 'r':
        location.reload()
        return
    }
  })
}
