export const init = ({
  tabs: browserTabs,
  onStateUpdate,
}) => {
  /* Initial state */
  const state = {
    tabs: [],
    skipped: [],
    currentTab: null,
  }

  /* */

  const fetchTabs = () =>
    browserTabs.query({ currentWindow: true, active: false })
      .then((tabs) => tabs.reverse())
      .then((tabs) => void (state.tabs = tabs))

  const setCurrent = () => {
    const untouchedTabs = state.tabs
      .filter(({ id }) => state.skipped.includes(id) === false)
    state.currentTab = untouchedTabs[0] ?? null
  }

  /* */

  const updateState = () =>
    fetchTabs()
      .then(setCurrent)
      .then(() => onStateUpdate(state))

  updateState()

  /* */

  return {
    getCurrentState() {
      return state
    },
    actions: {
      keepTab() {
        state.skipped.push(state.currentTab.id)
        updateState()
      },
      goToTab() {
        browserTabs.update(state.currentTab.id, { active: true })
          .then(updateState)
      },
      closeTab() {
        browserTabs.remove(state.currentTab.id)
          .then(updateState)
      },
    },
  }
}
