'use strict';
import * as actionTypes from '../constants/action_types';
import processHabitsStarted from '../utils/processHabitsStarted';

const initialState = {
  all: {},
  started: {}
};

const habit = (state = initialState, action = {}) => {
  let habit;
  let occurence;

  if (action.occurence && action.id) {
    habit = state.started.data.find((h) => { return h.id === action.id; });
    occurence = habit.occurences.find((o) => {
      return o.day === action.occurence.day && o.week === action.occurence.week;
    });
  }

  switch (action.type) {
    case actionTypes.HABIT_FETCH_ALL_FAIL:
    case actionTypes.HABIT_FETCH_ALL_SUCCESS:
      return {
        ...state,
        all: {
          ...action.response,
          loading: false,
          loaded: true
        }
      };
    case actionTypes.HABIT_FETCH_STARTED_FAIL:
    case actionTypes.HABIT_FETCH_STARTED_SUCCESS:
    case actionTypes.HABIT_START_SUCCESS:
    case actionTypes.HABIT_START_FAIL:
      return {
        ...state,
        started: {
          ...action.response,
          loading: false,
          loaded: true
        }
      };
    case actionTypes.HABIT_FETCH_ALL:
      return {
        ...state,
        all: {
          loading: true
        }
      };
    case actionTypes.HABIT_FETCH_STARTED:
      return {
        ...state,
        started: {
          loading: true
        }
      };
    case actionTypes.HABIT_CHECK:
      occurence._dateDT = occurence.dateDT;

      if (occurence.dateDT) {
        occurence.dateDT = null;
      } else {
        occurence.dateDT = Date.now();
      }

      return {
        ...state
      };
    case actionTypes.HABIT_CHECK_SUCCESS:
      state.started = processHabitsStarted(state.started);
      return {
        ...state
      };
    case actionTypes.HABIT_CHECK_FAIL:
      occurence.dateDT = occurence._dateDT;

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
};

export default habit
