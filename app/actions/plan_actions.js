import * as actionTypes from '../constants/action_types';
import { appError, appReceive } from './app_actions';
import { request } from './network_actions';
import processPlan from '../utils/processPlan';
import { initWeek } from './dashboard_actions';
import { loadAll } from '../api/workout';
import { end, updateFeedback, start, check, checkWithValue, update } from '../api/workout';
import { startCounter } from './counters_actions.js';
import { COUNT_DOWN } from '../constants/counter_directions';

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
      type: actionTypes.PLAN_START_WORKOUT,
      nextWorkoutId
    });

    return request(start(nextWorkoutId))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        actionTypes.PLAN_START_WORKOUT_SUCCESS,
        actionTypes.PLAN_START_WORKOUT_FAIL,
        { nextWorkoutId }
      )))
      .catch(error => fail(error));
  };
}

export function updateSet(currentWeekNo, workoutKey, exerciseGroupKey, setKey, field, value) {
  return (dispatch, getState) => {
    const props = {
      currentWeekNo,
      workoutKey,
      exerciseGroupKey,
      setKey,
      field,
      value
    };

    const set = getState().plan.data.weeks[currentWeekNo].workouts[workoutKey].exerciseGroups[exerciseGroupKey].sets[setKey];

    dispatch({
      type: actionTypes.PLAN_UPDATE_SET,
      ...props
    });

    return request(update(set.id, field, value))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        actionTypes.PLAN_UPDATE_SET_SUCCESS,
        actionTypes.PLAN_UPDATE_SET_FAIL,
        props
      )))
      .catch(error => fail(error));
  };
}

export function checkSet(currentWeekNo, workoutKey, exerciseGroupKey, setKey) {
  return (dispatch, getState) => {
    const props = {
      currentWeekNo,
      workoutKey,
      exerciseGroupKey,
      setKey
    };

    const set = getState().plan.data.weeks[currentWeekNo].workouts[workoutKey].exerciseGroups[exerciseGroupKey].sets[setKey];

    dispatch({
      type: actionTypes.PLAN_CHECK_SET,
      ...props
    });

    dispatch(startCounter(set.id, 0, COUNT_DOWN, set.rest));

    return request(check(set.id))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        actionTypes.PLAN_CHECK_SET_SUCCESS,
        actionTypes.PLAN_CHECK_SET_FAIL,
        props
      )))
      .catch(error => fail(error));
  };
}

export function checkSetWithValue(currentWeekNo, workoutKey, exerciseGroupKey, setKey, value) {
  return (dispatch, getState) => {
    const props = {
      currentWeekNo,
      workoutKey,
      exerciseGroupKey,
      setKey,
      value
    };

    const set = getState().plan.data.weeks[currentWeekNo].workouts[workoutKey].exerciseGroups[exerciseGroupKey].sets[setKey];

    dispatch({
      type: actionTypes.PLAN_CHECK_SET_WITH_VALUE,
      ...props
    });

    dispatch(startCounter(set.id, 0, COUNT_DOWN, set.rest));

    return request(checkWithValue(set.id, value))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        actionTypes.PLAN_CHECK_SET_WITH_VALUE_SUCCESS,
        actionTypes.PLAN_CHECK_SET_WITH_VALUE_FAIL,
        props
      )))
      .catch(error => fail(error));
  };
}

export function endWorkout(workoutKey, feedback) {
  return (dispatch) => {
    const params = {
      workoutKey,
      feedback
    };

    dispatch({
      type: actionTypes.PLAN_END_WORKOUT,
      ...params
    });

    return request(end(feedback.type, feedback.comments))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        actionTypes.PLAN_END_WORKOUT_SUCCESS,
        actionTypes.PLAN_END_WORKOUT_FAIL,
        params
      )))
      .catch(error => fail(error));
  };
}


export function persistFeedback(currentWeekNo, workoutKey, feedback) {
  return (dispatch, getState) => {
    const params = {
      currentWeekNo,
      workoutKey,
      feedback
    };
    const workoutId = getState().plan.data.weeks[currentWeekNo].workouts[workoutKey].id;

    dispatch({
      type: actionTypes.PLAN_PERSIST_FEEDBACK,
      ...params
    });

    return request(updateFeedback(workoutId, feedback.type, feedback.comments))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        actionTypes.PLAN_PERSIST_FEEDBACK_SUCCESS,
        actionTypes.PLAN_PERSIST_FEEDBACK_FAIL,
        params
      )))
      .catch(error => fail(error));
  };
}

export function planLoad() {
  return (dispatch) => {
    dispatch({ type: actionTypes.PLAN_LOAD });

    return request(loadAll())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          processPlanJson(json),
          actionTypes.PLAN_LOAD_SUCCESS,
          actionTypes.PLAN_LOAD_FAIL
        ));
        dispatch(initWeek());
      })
      .catch(error => fail(error));
  };
}
