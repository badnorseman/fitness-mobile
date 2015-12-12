import * as types from '../actions/action_types';

const initialState = {};

export default function plan(state = initialState, action = {}) {
  switch (action.type) {
    case types.PLAN_LOAD_FAIL:
    case types.PLAN_LOAD_SUCCESS:
    case types.PLAN_END_WORKOUT_SUCCESS:
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
      return state;
    case types.PLAN_PERSIST_FEEDBACK:
    case types.PLAN_START_WORKOUT:
    case types.PLAN_END_WORKOUT:
    case types.PLAN_CHECK_SET:
    default:
      return state;
  }
}
