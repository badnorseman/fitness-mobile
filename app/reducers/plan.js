import * as types from '../actions/action_types';
import prepareColumns from '../utils/prepareColumns';

const initialState = {};

export default function plan(state = initialState, action = {}) {
  let set;
  let missingField;

  if (typeof action.currentWeekNo === 'number' && typeof action.workoutKey === 'number' && typeof action.exerciseGroupKey === 'number' && typeof action.setKey === 'number') {
    set = state.data.weeks[action.currentWeekNo].workouts[action.workoutKey].exerciseGroups[action.exerciseGroupKey].sets[action.setKey];
    if (set.c1Missing) {
      missingField = set.c1FieldName;
    } else if (set.c2Missing) {
      missingField = set.c2FieldName;
    }
  }

  switch (action.type) {
    case types.PLAN_LOAD_FAIL:
    case types.PLAN_LOAD_SUCCESS:
    case types.PLAN_END_WORKOUT_SUCCESS:
    case types.PLAN_START_WORKOUT_SUCCESS:
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
    case types.PLAN_PERSIST_FEEDBACK_SUCCESS:
      state.data.weeks[action.currentWeekNo].workouts[action.workoutKey].feedback = action.feedback;
      return {
        ...state
      };
    case types.PLAN_CHECK_SET:
    case types.PLAN_CHECK_SET_SUCCESS:
      set.dateDT = Date.now();
      return {
        ...state
      };
    case types.PLAN_CHECK_SET_WITH_VALUE:
      set.missingField = false;
      set.dateDT = Date.now();
      return {
        ...state
      };
    case types.PLAN_CHECK_SET_WITH_VALUE_SUCCESS:
      set.missingField = false;
      set.dateDT = Date.now();
      set[missingField] = action.value;
      prepareColumns(set);
      return {
        ...state
      };
    case types.PLAN_CHECK_SET_FAIL:
    case types.PLAN_CHECK_SET_WITH_VALUE_FAIL:
      set.dateDT = null;
      if (missingField) {
        set.missingField = missingField;
      }
      return {
        ...state
      };
    case types.PLAN_PERSIST_FEEDBACK:
    case types.PLAN_START_WORKOUT:
    case types.PLAN_END_WORKOUT:
      return {
        ...state
      };
    default:
      return state;
  }
}
