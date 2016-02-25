import CookieManager from 'react-native-cookies';
import { AsyncStorage } from 'react-native';
import * as actionTypes from '../constants/action_types';
import { appError, appReceive } from './app_actions';
import { request } from './network_actions';
import { check, loginEmail } from '../api/auth';
import { SERVER } from '../constants/server';

const STORAGE_KEY = '@Fitbird:authCookieHeader';

const send = () => ({
  type: actionTypes.AUTH_SEND
});

const checkCookie = () => (dispatch) =>
  request(check())(dispatch)
    .then(response => response.json())
    .then(json => {
      dispatch(appReceive(
        json, actionTypes.AUTH_BY_COOKIE_SUCCESS, actionTypes.AUTH_BY_COOKIE_FAIL
      ));
    })
    .catch(error => appError(error));

const storeCookie = () => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_STORE_COOKIE });

  CookieManager.get(`${SERVER}/`, (cookie) => {
    if (!cookie) {
      dispatch({ type: actionTypes.AUTH_STORE_COOKIE_FAIL });
      return;
    }

    try {
      AsyncStorage.setItem(STORAGE_KEY, cookie, () => {
        dispatch({ type: actionTypes.AUTH_STORE_COOKIE_SUCCESS });
      });
    } catch (error) {
      dispatch({ type: actionTypes.AUTH_STORE_COOKIE_FAIL });
    }
  });
};

const authByCookie = () => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_BY_COOKIE });

  AsyncStorage.getItem(STORAGE_KEY, (err, cookie) => {
    if (cookie) {
      CookieManager.setFromResponse(`${SERVER}/`, cookie, () => {
        dispatch(checkCookie());
      });
    } else {
      dispatch({ type: actionTypes.AUTH_BY_COOKIE_FAIL });
    }
  });
};

const clear = () => (dispatch) => {
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

const login = (email, password) => (dispatch) => {
  dispatch(send());

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

const logout = () => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_LOGOUT });
  dispatch(clear());
};

export { authByCookie, clear, login, logout };
