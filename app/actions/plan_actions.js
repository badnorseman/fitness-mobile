import * as types from './action_types';
import { appError, appReceive } from './app_actions';
import { request } from './network_actions';
import processPlan from '../utils/processPlan';
import { initWeek } from './dashboard_actions';
import { load } from '../api/plan';

function fail(error) {
  return appError(error);
}

function processJson(json) {
  if (json.ok && json.data) {
    json.data = processPlan(json.data);
  }

  return json;
}

export function startWorkout(workoutKey) {
  return {
    type: types.PLAN_START_WORKOUT,
    workoutKey: workoutKey
  };
}

export function updateWorkout(workoutKey, exerciseGroupKey, setKey, field, value) {
  return {
    type: types.PLAN_UPDATE_WORKOUT,
    workoutKey: workoutKey,
    exerciseGroupKey: exerciseGroupKey,
    setKey: setKey,
    field: field,
    value: value
  };
}

export function checkSet(workoutKey, exerciseGroupKey, setKey) {
  return {
    type: types.PLAN_CHECK_SET,
    workoutKey: workoutKey,
    exerciseGroupKey: exerciseGroupKey,
    setKey: setKey
  };
}

export function checkSetWithValue(workoutKey, exerciseGroupKey, setKey, value) {
  return {
    type: types.PLAN_CHECK_SET_WITH_VALUE,
    workoutKey: workoutKey,
    exerciseGroupKey: exerciseGroupKey,
    setKey: setKey,
    value: value
  };
}

export function endWorkout(workoutKey, feedback) {
  return {
    type: types.PLAN_END_WORKOUT,
    workoutKey: workoutKey,
    feedback: feedback
  };
}


export function persistFeedback(workoutKey, feedback) {
  return {
    type: types.PLAN_PERSIST_FEEDBACK,
    workoutKey: workoutKey,
    feedback: feedback
  };
}

export function planLoad() {
  return (dispatch) => {
    dispatch({ type: types.PLAN_LOAD });

    return request(load())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          processJson(json),
          types.PLAN_LOAD_SUCCESS,
          types.PLAN_LOAD_FAIL
        ));
        dispatch(initWeek());
      })
      .catch(error => fail(error));
  };
}
