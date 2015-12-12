import * as types from './action_types';
import { appError, appReceive } from './app_actions';
import { request } from './network_actions';
import processPlan from '../utils/processPlan';
import { initWeek } from './dashboard_actions';
import { load } from '../api/plan';
import { end, updateFeedback, start, check, checkWithValue } from '../api/workout';

function fail(error) {
  return appError(error);
}

function processPlanJson(json) {
  if (json.ok && json.data) {
    json.data = processPlan(json.data);
  }

  return json;
}

export function startWorkout(nextWorkoutId) {
  return (dispatch) => {
    dispatch({
      type: types.PLAN_START_WORKOUT,
      nextWorkoutId: nextWorkoutId
    });

    return request(start(nextWorkoutId))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        types.PLAN_START_WORKOUT_SUCCESS,
        types.PLAN_START_WORKOUT_FAIL,
        { nextWorkoutId: nextWorkoutId }
      )))
      .catch(error => fail(error));
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

export function checkSet(currentWeekNo, workoutKey, exerciseGroupKey, setKey) {  
  return (dispatch, getState) => {
    const props = {
      currentWeekNo: currentWeekNo,
      workoutKey: workoutKey,
      exerciseGroupKey: exerciseGroupKey,
      setKey: setKey
    };

    const set = getState().plan.data.weeks[currentWeekNo].workouts[workoutKey].exerciseGroups[exerciseGroupKey].sets[setKey];

    dispatch({
      type: types.PLAN_CHECK_SET,
      ...props
    });

    return request(check(set.id))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        types.PLAN_CHECK_SET_SUCCESS,
        types.PLAN_CHECK_SET_FAIL,
        props
      )))
      .catch(error => fail(error));
  };
}

export function checkSetWithValue(currentWeekNo, workoutKey, exerciseGroupKey, setKey, value) {
  return (dispatch, getState) => {
    const props = {
      currentWeekNo: currentWeekNo,
      workoutKey: workoutKey,
      exerciseGroupKey: exerciseGroupKey,
      setKey: setKey,
      value: value
    };

    const set = getState().plan.data.weeks[currentWeekNo].workouts[workoutKey].exerciseGroups[exerciseGroupKey].sets[setKey];

    dispatch({
      type: types.PLAN_CHECK_SET_WITH_VALUE,
      ...props
    });

    return request(checkWithValue(set.id, value))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        types.PLAN_CHECK_SET_WITH_VALUE_SUCCESS,
        types.PLAN_CHECK_SET_WITH_VALUE_FAIL,
        props
      )))
      .catch(error => fail(error));
  };
}

export function endWorkout(workoutKey, feedback) {
  return (dispatch) => {
    const params = {
      workoutKey: workoutKey,
      feedback: feedback
    };

    dispatch({
      type: types.PLAN_END_WORKOUT,
      ...params
    });

    return request(end(feedback.type, feedback.comments))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        types.PLAN_END_WORKOUT_SUCCESS,
        types.PLAN_END_WORKOUT_FAIL,
        params
      )))
      .catch(error => fail(error));
  };
}


export function persistFeedback(currentWeekNo, workoutKey, feedback) {
  return (dispatch, getState) => {
    const params = {
      currentWeekNo: currentWeekNo,
      workoutKey: workoutKey,
      feedback: feedback
    };
    const workoutId = getState().plan.data.weeks[currentWeekNo].workouts[workoutKey].id;

    dispatch({
      type: types.PLAN_PERSIST_FEEDBACK,
      ...params
    });

    return request(updateFeedback(workoutId, feedback.type, feedback.comments))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        types.PLAN_PERSIST_FEEDBACK_SUCCESS,
        types.PLAN_PERSIST_FEEDBACK_FAIL,
        params
      )))
      .catch(error => fail(error));
  };
}

export function planLoad() {
  return (dispatch) => {
    dispatch({ type: types.PLAN_LOAD });

    return request(load())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          processPlanJson(json),
          types.PLAN_LOAD_SUCCESS,
          types.PLAN_LOAD_FAIL
        ));
        dispatch(initWeek());
      })
      .catch(error => fail(error));
  };
}
