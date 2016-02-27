import * as actionTypes from '../constants/action_types'

const initialState = {}

export const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.AUTH_SEND:
    case actionTypes.AUTH_CHECK_COOKIE:
    case actionTypes.AUTH_BY_COOKIE:
      return {
        loggingIn: true
      }
    case actionTypes.AUTH_BY_COOKIE_SUCCESS:
    case actionTypes.AUTH_SUCCESS:
    case actionTypes.AUTH_FAIL:
      return {
        ...action.response
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...initialState,
        logout: true
      }
    case actionTypes.AUTH_CLEAR:
    case actionTypes.AUTH_CLEAR_SUCCESS:
    case actionTypes.AUTH_CHECK_COOKIE_FAIL:
    case actionTypes.AUTH_BY_COOKIE_FAIL:
      return initialState
    case actionTypes.AUTH_CHECK_COOKIE_SUCCESS:
    default:
      return state
  }
}
