import * as actionTypes from '../constants/action_types'
import { appError, appReceive } from './app_actions'
import { initWeek } from './dashboard_actions'
import { request } from './network_actions'
import { startCounter } from './counters_actions.js'
import { check, checkWithValue, end, loadAll, update, updateFeedback, start } from '../api/workout'
import processPlan from '../utils/processPlan'
import { COUNT_DOWN } from '../constants/counter_directions'

const processPlanJson = (json) => {
  if (json.ok && json.data) {
    json.data = processPlan(json.data)
  }

  return json
}

export const startWorkout = (nextWorkoutId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PLAN_START_WORKOUT,
      nextWorkoutId
    })

    return request(start(nextWorkoutId))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        actionTypes.PLAN_START_WORKOUT_SUCCESS,
        actionTypes.PLAN_START_WORKOUT_FAIL,
        { nextWorkoutId }
      )))
      .catch(error => appError(error))
  }
}

export const updateSet = (currentWeekNo, workoutKey, exerciseGroupKey, setKey, field, value) => {
  return (dispatch, getState) => {
    const data = {
      currentWeekNo,
      workoutKey,
      exerciseGroupKey,
      setKey,
      field,
      value
    }

    const set = getState().plan.data.
      weeks[currentWeekNo].
      workouts[workoutKey].
      exerciseGroups[exerciseGroupKey].
      sets[setKey]

    dispatch({
      type: actionTypes.PLAN_UPDATE_SET,
      ...data
    })

    return request(update(set.id, field, value))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        actionTypes.PLAN_UPDATE_SET_SUCCESS,
        actionTypes.PLAN_UPDATE_SET_FAIL,
        data
      )))
      .catch(error => appError(error))
  }
}

export const checkSet = (currentWeekNo, workoutKey, exerciseGroupKey, setKey) => {
  return (dispatch, getState) => {
    const data = {
      currentWeekNo,
      workoutKey,
      exerciseGroupKey,
      setKey
    }

    const set = getState().plan.data.
      weeks[currentWeekNo].
      workouts[workoutKey].
      exerciseGroups[exerciseGroupKey].
      sets[setKey]

    dispatch({
      type: actionTypes.PLAN_CHECK_SET,
      ...data
    })

    dispatch(startCounter(set.id, 0, COUNT_DOWN, set.rest))

    return request(check(set.id))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        actionTypes.PLAN_CHECK_SET_SUCCESS,
        actionTypes.PLAN_CHECK_SET_FAIL,
        data
      )))
      .catch(error => appError(error))
  }
}

export const checkSetWithValue = (currentWeekNo, workoutKey, exerciseGroupKey, setKey, value) => {
  return (dispatch, getState) => {
    const data = {
      currentWeekNo,
      workoutKey,
      exerciseGroupKey,
      setKey,
      value
    }

    const set = getState().plan.data.
      weeks[currentWeekNo].
      workouts[workoutKey].
      exerciseGroups[exerciseGroupKey].
      sets[setKey]

    dispatch({
      type: actionTypes.PLAN_CHECK_SET_WITH_VALUE,
      ...data
    })

    dispatch(startCounter(set.id, 0, COUNT_DOWN, set.rest))

    return request(checkWithValue(set.id, value))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        actionTypes.PLAN_CHECK_SET_WITH_VALUE_SUCCESS,
        actionTypes.PLAN_CHECK_SET_WITH_VALUE_FAIL,
        data
      )))
      .catch(error => appError(error))
  }
}

export const endWorkout = (workoutKey, feedback) => {
  return (dispatch) => {
    const data = {
      workoutKey,
      feedback
    }

    dispatch({
      type: actionTypes.PLAN_END_WORKOUT,
      ...data
    })

    return request(end(feedback.type, feedback.comments))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        actionTypes.PLAN_END_WORKOUT_SUCCESS,
        actionTypes.PLAN_END_WORKOUT_FAIL,
        data
      )))
      .catch(error => appError(error))
  }
}

export const persistFeedback = (currentWeekNo, workoutKey, feedback) => {
  return (dispatch, getState) => {
    const data = {
      currentWeekNo,
      workoutKey,
      feedback
    }

    const workoutId = getState().plan.data.
      weeks[currentWeekNo].
      workouts[workoutKey].id

    dispatch({
      type: actionTypes.PLAN_PERSIST_FEEDBACK,
      ...data
    })

    return request(updateFeedback(workoutId, feedback.type, feedback.comments))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        processPlanJson(json),
        actionTypes.PLAN_PERSIST_FEEDBACK_SUCCESS,
        actionTypes.PLAN_PERSIST_FEEDBACK_FAIL,
        data
      )))
      .catch(error => appError(error))
  }
}

export const planLoad = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.PLAN_LOAD })

    return request(loadAll())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          processPlanJson(json),
          actionTypes.PLAN_LOAD_SUCCESS,
          actionTypes.PLAN_LOAD_FAIL
        ))
        dispatch(initWeek())
      })
      .catch(error => appError(error))
  }
}
