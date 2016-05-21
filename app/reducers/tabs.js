
import { handleActions } from 'redux-actions'

const initial = {

  current: 0,
  currentAddress: 'https://www.google.com',

  tabs: [
    { title: 'Google', url: 'https://www.google.com' },
    { title: 'Youtube', url: 'https://www.youtube.com' }
  ],
}

export default handleActions({

  ADD_TAB: (state, { payload: query }) => ({
    ...state,
    current: query.toCurrent ? state.tabs.length : state.current,
    currentAddress: query.toCurrent ? query.tab.url : state.currentAddress,
    tabs: [ ...state.tabs, query.tab ],
  }),

  REMOVE_TAB: (state, { payload: index }) => ({
    ...state,
    tabs: [
      ...state.tabs.slice(0, index),
      ...state.tabs.slice(index + 1),
    ],
    current: 0,
  }),

  UPDATE_CURRENT_TAB: (state, { payload: updater }) => ({
    ...state,
    tabs: [
      ...state.tabs.slice(0, state.current),
      updater(state.tabs[state.current]),
      ...state.tabs.slice(state.current + 1),
    ],
  }),

  UPDATE_INDEX: (state, { payload: updater }) => ({
    ...state,
    tabs: [
      ...state.tabs.slice(0, updater.index),
      updater(state.tabs[updater.index]),
      ...state.tabs.slice(updater.index + 1),
    ],
  }),

  UPDATE_ADDRESS_BAR: (state, { payload: url }) => ({
    ...state,
    currentAddress: url || state.tabs[state.current].url,
  }),

  SET_CURRENT_TAB: (state, { payload: current }) => ({
    ...state,
    current
  }),

}, initial)
