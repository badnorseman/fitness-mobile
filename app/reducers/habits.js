import * as types from '../actions/action_types';
import processHabitsStarted from '../utils/processHabitsStarted';

const initialState = {
  all: {},
  started: {}
};

export default function habits(state = initialState, action = {}) {
  let habit;
  let occurence;

  if (action.occurence && action.id){
    habit = state.started.data.find((h) => { return h.id === action.id; });
    occurence = habit.occurences.find((o) => { return o.day === action.occurence.day && o.week === action.occurence.week; });
  }

  switch (action.type) {
    case types.HABITS_LOAD_ALL_FAIL:
    case types.HABITS_LOAD_ALL_SUCCESS:
      return {
        ...state,
        all: {
          ...action.response,
          loading: false,
          loaded: true
        }
      };
    case types.HABITS_LOAD_STARTED_FAIL:
    case types.HABITS_LOAD_STARTED_SUCCESS:
    case types.HABITS_START_SUCCESS:
    case types.HABITS_START_FAIL:
      return {
        ...state,
        started: {
          ...action.response,
          loading: false,
          loaded: true
        }
      };
    case types.HABITS_LOAD_ALL:
      return {
        ...state,
        all: {
          loading: true
        }
      };
    case types.HABITS_LOAD_STARTED:
      return {
        ...state,
        started: {
          loading: true
        }
      };
    case types.HABITS_CHECK:
      occurence._dateDT = occurence.dateDT;

      if (occurence.dateDT) {
        occurence.dateDT = null;
      } else {
        occurence.dateDT = Date.now();
      }

      return {
        ...state
      };
    case types.HABITS_CHECK_SUCCESS:
      state.started = processHabitsStarted(state.started);
      return {
        ...state
      };
    case types.HABITS_CHECK_FAIL:
      occurence.dateDT = occurence._dateDT;

      return {
        ...state
      };
    default:
      return state;
  }
}