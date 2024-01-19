export const attachKeyboardHandlers = (store) => {
  document.addEventListener('keydown', (e) => {
    switch (e.code) {
      case 'KeyD':
      case 'ArrowLeft':
        store.actions.closeTab(store.getCurrentState().currentTab)
        return
      case 'KeyK':
      case 'ArrowRight':
        store.actions.keepTab(store.getCurrentState().currentTab)
        return
      case 'KeyF':
      case 'ArrowUp':
        store.actions.goToTab(store.getCurrentState().currentTab)
        return
      case 'KeyR':
        location.reload()
        return
    }
  })
}
