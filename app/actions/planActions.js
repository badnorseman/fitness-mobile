import * as types from './actionTypes';
import { appError, appReceive } from './appActions';
import processPlan from '../utils/processPlan';
import { initWeek } from './dashboardActions';

function load(){
  return {
    type: types.PLAN_LOAD
  };
}

function fail(error) {
  return appError(error);
}

function processJson(json) {
  if(json.ok && json.data){
    json.data = processPlan(json.data);
  }

  return json;
}

export function endWorkout(workoutKey){
  return {
    type: types.PLAN_END_WORKOUT,
    workoutKey: workoutKey
  };
}

export function startWorkout(workoutKey){
  return {
    type: types.PLAN_START_WORKOUT,
    workoutKey: workoutKey
  };
}

export function updateWorkout(workoutKey, exerciseGroupKey, setKey, field, value){
  return {
    type: types.PLAN_UPDATE_WORKOUT,
    workoutKey: workoutKey,
    exerciseGroupKey: exerciseGroupKey,
    setKey: setKey,
    field: field,
    value: value
  };
}

export function checkSet(workoutKey, exerciseGroupKey, setKey){
  return {
    type: types.PLAN_CHECK_SET,
    workoutKey: workoutKey,
    exerciseGroupKey: exerciseGroupKey,
    setKey: setKey
  };
}

export function checkSetWithValue(workoutKey, exerciseGroupKey, setKey, value){
  return {
    type: types.PLAN_CHECK_SET_WITH_VALUE,
    workoutKey: workoutKey,
    exerciseGroupKey: exerciseGroupKey,
    setKey: setKey,
    value: value
  };
}

export function endWorkout(workoutKey, feedback){
  return {
    type: types.PLAN_END_WORKOUT,
    workoutKey: workoutKey,
    feedback: feedback
  };
}


export function persistFeedback(workoutKey, feedback){
  return {
    type: types.PLAN_PERSIST_FEEDBACK,
    workoutKey: workoutKey,
    feedback: feedback
  };
}

export function planLoad(email, password) {
  return (dispatch, getState) => {
    dispatch(load());

    return fetch('http://app.fitbird.com/api/plan', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': 'app.fitbird.com'
      }
    })
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
