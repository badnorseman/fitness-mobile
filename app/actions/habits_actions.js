import * as types from './action_types';
import { appError, appReceive } from './app_actions';
import { request } from './network_actions';
import { loadAll, loadStarted, check, start } from '../api/habits';

import processHabitsStarted from '../utils/processHabitsStarted';

export function habitsLoadAll() {
  return (dispatch) => {
    dispatch({ type: types.HABITS_LOAD_ALL });

    return request(loadAll())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          json,
          types.HABITS_LOAD_ALL_SUCCESS,
          types.HABITS_LOAD_ALL_FAIL
        ));
      })
      .catch(error => appError(error));
  };
}

export function habitsLoadStarted() {
  return (dispatch) => {
    dispatch({ type: types.HABITS_LOAD_STARTED });

    return request(loadStarted())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          processHabitsStarted(json),
          types.HABITS_LOAD_STARTED_SUCCESS,
          types.HABITS_LOAD_STARTED_FAIL
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
      type: types.HABITS_CHECK,
      ...props
    });

    return request(check(id, occurence))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        json,
        types.HABITS_CHECK_SUCCESS,
        types.HABITS_CHECK_FAIL,
        props
      )))
      .catch(error => appError(error));
  };
}

export function habitsStart(id) {
  return (dispatch) => {
    dispatch({
      type: types.HABITS_START,
      id: id
    });

    return request(start(id))(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          processHabitsStarted(json),
          types.HABITS_START_SUCCESS,
          types.HABITS_START_FAIL
        ));
      })
      .catch(error => appError(error));
  };
}
