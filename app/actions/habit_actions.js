'use strict';
import * as actionTypes from '../constants/action_types';
import { appError, appReceive } from './app_actions';
import { request } from './network_actions';
import { loadAll, loadStarted, check, start } from '../api/habit_api';
import processHabitsStarted from '../utils/processHabitsStarted';

const checkHabit = (id, occurence) => {
  return (dispatch) => {
    const props = {
      id: id,
      occurence: occurence
    };

    dispatch({
      type: actionTypes.HABIT_CHECK,
      ...props
    });

    return request(check(id, occurence))(dispatch)
      .then(response => response.json())
      .then(json => dispatch(appReceive(
        json,
        actionTypes.HABIT_CHECK_SUCCESS,
        actionTypes.HABIT_CHECK_FAIL,
        props
      )))
      .catch(error => appError(error));
  };
};

const loadAllHabit = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.HABIT_LOAD_ALL });

    return request(loadAll())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          json,
          actionTypes.HABIT_LOAD_ALL_SUCCESS,
          actionTypes.HABIT_LOAD_ALL_FAIL
        ));
      })
      .catch(error => appError(error));
  };
};

const loadStartedHabit = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.HABIT_LOAD_STARTED });

    return request(loadStarted())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          processHabitsStarted(json),
          actionTypes.HABIT_LOAD_STARTED_SUCCESS,
          actionTypes.HABIT_LOAD_STARTED_FAIL
        ));
      })
      .catch(error => appError(error));
  };
};

const startHabit = (id) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.HABIT_START,
      id: id
    });

    return request(start(id))(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          processHabitsStarted(json),
          actionTypes.HABIT_START_SUCCESS,
          actionTypes.HABIT_START_FAIL
        ));
      })
      .catch(error => appError(error));
  };
};

export { checkHabit, loadAllHabit, loadStartedHabit, startHabit };
