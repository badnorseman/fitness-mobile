import * as actionTypes from '../constants/action_types';
import { appError, appReceive } from './app_actions';
import { request } from './network_actions';
import { loadAll, loadStarted, check, start } from '../api/habits';

import processHabitsStarted from '../utils/processHabitsStarted';

export function habitsLoadAll() {
  return (dispatch) => {
    dispatch({ type: actionTypes.HABITS_LOAD_ALL });

    return request(loadAll())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          json,
          actionTypes.HABITS_LOAD_ALL_SUCCESS,
          actionTypes.HABITS_LOAD_ALL_FAIL
        ));
      })
      .catch(error => appError(error));
  };
}

export function habitsLoadStarted() {
  return (dispatch) => {
    dispatch({ type: actionTypes.HABITS_LOAD_STARTED });

    return request(loadStarted())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          processHabitsStarted(json),
          actionTypes.HABITS_LOAD_STARTED_SUCCESS,
          actionTypes.HABITS_LOAD_STARTED_FAIL
        ));
      })
      .catch(error => appError(error));
  };
}

export function habitsCheck(id, occurence) {
  return (dispatch) => {
    const props = {
      id: id,
      occurence: occurence
    };

    dispatch({
      type: actionTypes.HABITS_CHECK,
      ...props
    });

    return request(check(id, occurence))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        json,
        actionTypes.HABITS_CHECK_SUCCESS,
        actionTypes.HABITS_CHECK_FAIL,
        props
      )))
      .catch(error => appError(error));
  };
}

export function habitsStart(id) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.HABITS_START,
      id: id
    });

    return request(start(id))(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          processHabitsStarted(json),
          actionTypes.HABITS_START_SUCCESS,
          actionTypes.HABITS_START_FAIL
        ));
      })
      .catch(error => appError(error));
  };
}
