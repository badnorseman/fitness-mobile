import CookieManager from 'react-native-cookies';
import { AsyncStorage } from 'react-native';
import * as actionTypes from '../constants/action_types';
import { appError, appReceive } from './app_actions';
import { request } from './network_actions';
import { check, loginEmail } from '../api/auth';

const STORAGE_KEY = '@Fitbird:authCookie';

function send(email, password) {
  return {
    type: actionTypes.AUTH_SEND,
    email,
    password
  };
}

export function checkCookie() {
  return (dispatch) => {
    request(check())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(
          json, actionTypes.AUTH_BY_COOKIE_SUCCESS, actionTypes.AUTH_BY_COOKIE_FAIL
        ));
      })
      .catch(error => appError(error));
  };
}

export function storeCookie() {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_STORE_COOKIE, key: STORAGE_KEY });

    CookieManager.getAll((cookie) => {
      if (!cookie || !cookie.SS) {
        dispatch({ type: actionTypes.AUTH_STORE_COOKIE_FAIL, key: STORAGE_KEY });
        return;
      }

      try {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cookie.SS), () => {
          dispatch({
            type: actionTypes.AUTH_STORE_COOKIE_SUCCESS,
            key: STORAGE_KEY, cookie: JSON.stringify(cookie.SS)
          });
        });
      } catch (error) {
        dispatch({ type: actionTypes.AUTH_STORE_COOKIE_FAIL, error });
      }
    });
  };
}

export function authByCookie() {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_BY_COOKIE });

    AsyncStorage.getItem(STORAGE_KEY, (err, res) => {
      if (res) {
        const cookie = JSON.parse(res);

        CookieManager.set({
          origin: '',
          version: '1',
          expiration: '9999-12-31T00:00:00.00-05:00', // Some ridiculous time in future
          ...cookie
        }, () => {
          dispatch(checkCookie());
        });
      } else {
        dispatch({ type: actionTypes.AUTH_BY_COOKIE_FAIL });
      }
    });
  };
}

export function clear() {
  return (dispatch) => {
    AsyncStorage.removeItem(STORAGE_KEY)
      .then(() => {
        CookieManager.clearAll((err, res) => {
          dispatch({
            err,
            res,
            type: actionTypes.AUTH_CLEAR
          });
        });
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_LOGOUT });
    dispatch(clear());
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(send(email, password));

    return request(loginEmail(email, password))(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(storeCookie());
        dispatch(appReceive(
          json,
          actionTypes.AUTH_SUCCESS,
          actionTypes.AUTH_FAIL
        ));
      })
      .catch(error => appError(error));
  };
}
