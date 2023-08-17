/* https://png-pixel.com/ */
const defaultFavicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='

export const updateInterface = (state) => {
  const tokens = [
    ['favicon', 'src', state.currentTab.favIconUrl ?? defaultFavicon],
    ['tabTotalNumber', 'textContent', state.tabs.length],
    ['tabNumber', 'textContent', state.tabs.length - state.tabs.findIndex(({ id }) =>
      id === state.currentTab.id
    )],
    ['currentTab', 'href', state.currentTab.url],
    ['tabTitle', 'textContent', state.currentTab.title],
    ['tabURL', 'textContent', state.currentTab.url],
  ]

  tokens.forEach(([elementId, property, value]) => {
    document.getElementById(elementId)[property] = value
  })
}

export const enableFaviconFallback = () => {
  document.getElementById('favicon').addEventListener('error', (e) => {
    e.currentTarget.src = defaultFavicon
  })
}
