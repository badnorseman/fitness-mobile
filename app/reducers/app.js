import * as actionTypes from '../constants/action_types'

const initialState = {}

export const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.APP_ERROR:
      return {
        ...state
      }
    default:
      return state
  }
}
