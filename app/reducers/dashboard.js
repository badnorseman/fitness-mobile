import * as actionTypes from '../constants/action_types'

const initialState = {}

export const dashboard = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.AUTH_CLEAR:
      return {
        ...initialState
      }
    case actionTypes.DASHBOARD_SET_WEEK:
      return {
        ...state,
        week: action.week
      }
    case actionTypes.DASHBOARD_INIT_WEEK:
    case actionTypes.DASHBOARD_NEXT_WEEK:
    case actionTypes.DASHBOARD_PREV_WEEK:
    default:
      return state
  }
}
