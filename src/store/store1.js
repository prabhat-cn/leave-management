import { createStore } from 'redux'

const initialState = {
  sidebarShow: false,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const sidePanelStore = createStore(changeState)
export default sidePanelStore
