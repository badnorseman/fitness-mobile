import * as types from '../actions/actionTypes';

const initialState = {};

export default function plan(state = initialState, action = {}) {
  console.log('plan action', action);
  switch (action.type) {
    case types.PLAN_LOAD_FAIL:
    case types.PLAN_LOAD_SUCCESS:
      return {
        ...state,
        ...action.response,
        loading: false
      };
    case types.PLAN_LOAD:
      return {
        ...state,
        loading: true
      };
    case types.PLAN_PERSIST_FEEDBACK:
    case types.PLAN_START_WORKOUT:
    case types.PLAN_END_WORKOUT:
    case types.PLAN_CHECK_SET:
    default:
      return state;
  };
}
