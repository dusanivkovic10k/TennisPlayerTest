import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  playerRequest: null,
  playerSuccess: ['data'],
  playerFailure: null,

  playerFilterSet: ['filterData'],
})

export const PlayerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  filterData: {
    gender: -1,
    level: -1,
  },
  fetching: false,
  error: null
})

/* ------------- Selectors ------------- */

export const PlayerSelectors = {
  getData: state => state.player.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  console.log('action -', action)
  const { data } = action
  return state.merge({ fetching: false, error: null, data })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, data: null })

// set filter
export const setFilter = (state, action) => {
  const { filterData } = action
  const fetching = !state.fetching
  return state.merge({ filterData, fetching })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PLAYER_REQUEST]: request,
  [Types.PLAYER_SUCCESS]: success,
  [Types.PLAYER_FAILURE]: failure,
  [Types.PLAYER_FILTER_SET]: setFilter
})
