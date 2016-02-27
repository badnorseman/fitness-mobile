import * as actionTypes from '../constants/action_types'
import { appError, appReceive } from './app_actions'
import { request } from './network_actions'
import { check, fetchAll, fetchStarted, start } from '../api/habit'
import processHabitsStarted from '../utils/processHabitsStarted'

export const checkHabit = (id, occurence) => {
  return (dispatch) => {
    const data = {
      id,
      occurence
    }

    dispatch({
      type: actionTypes.HABIT_CHECK,
      ...data
    })

    return request(check(id, occurence))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        json,
        actionTypes.HABIT_CHECK_SUCCESS,
        actionTypes.HABIT_CHECK_FAIL,
        data
      )))
      .catch(error => appError(error))
  }
}

export const getHabits = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.HABIT_FETCH_ALL })

    return request(fetchAll())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          json,
          actionTypes.HABIT_FETCH_ALL_SUCCESS,
          actionTypes.HABIT_FETCH_ALL_FAIL
        ))
      })
      .catch(error => appError(error))
  }
}

export const getStartedHabits =() => {
  return (dispatch) => {
    dispatch({ type: actionTypes.HABIT_FETCH_STARTED })

    return request(fetchStarted())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          processHabitsStarted(json),
          actionTypes.HABIT_FETCH_STARTED_SUCCESS,
          actionTypes.HABIT_FETCH_STARTED_FAIL
        ))
      })
      .catch(error => appError(error))
  }
}

export const startHabit = (id) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.HABIT_START,
      id
    })

    return request(start(id))(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          processHabitsStarted(json),
          actionTypes.HABIT_START_SUCCESS,
          actionTypes.HABIT_START_FAIL
        ))
      })
      .catch(error => appError(error))
  }
}
