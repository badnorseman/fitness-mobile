import * as actionTypes from '../actions/action_types';
import { COUNT_UP, COUNT_DOWN } from '../constants/counter_directions';

const initialState = {};

export default function counters(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.COUNTERS_START:
      state[action.counterKey] = {
        limit: action.limit,
        direction: action.direction,
        startFrom: action.startFrom,
        count: action.count,
        active: true
      };

      return {
        ...state
      };
    case actionTypes.COUNTERS_STOP:
      state[action.counterKey].active = false;
      return {
        ...state
      };
    case actionTypes.COUNTERS_RESUME:
      state[action.counterKey].active = true;
      return {
        ...state
      };
    case actionTypes.COUNTERS_RESET:
      state[action.counterKey].count = state[action.counterKey].startFrom;
      return {
        ...state
      };
    case actionTypes.COUNTERS_TICK:
      if (state[action.counterKey].direction === COUNT_UP) {
        state[action.counterKey].count = state[action.counterKey].count + 1;
      } else if (state[action.counterKey].direction === COUNT_DOWN) {
        state[action.counterKey].count = state[action.counterKey].count - 1;
      }

      return {
        ...state
      };
    case actionTypes.AUTH_CLEAR: 
      return {
        ...initialState
      };
    default:
      return state;
  }
}
