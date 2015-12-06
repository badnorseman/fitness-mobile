import * as types from '../actions/action_types';

const initialState = {};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case types.AUTH_BY_COOKIE_SUCCESS:
    case types.AUTH_SUCCESS:
    case types.AUTH_FAIL:
      return {
        ...state,
        ...action.response
      };
    case types.AUTH_LOGOUT:
      return {
        ...initialState,
        logout: true
      };
    case types.AUTH_CLEAR:
    case types.AUTH_CLEAR_SUCCESS:
      return initialState;
    case types.AUTH_SEND:
    case types.AUTH_CHECK_COOKIE:
    case types.AUTH_CHECK_COOKIE_SUCCESS:
    case types.AUTH_CHECK_COOKIE_FAIL:
    case types.AUTH_BY_COOKIE_FAIL:
    default:
      return state;
  };
}
