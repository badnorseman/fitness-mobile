import CookieManager from 'react-native-cookies';
import { AsyncStorage } from 'react-native';
import * as actionTypes from '../constants/action_types';
import { appError, appReceive } from './app_actions';
import { request } from './network_actions';
import { check, loginEmail } from '../api/auth';
import { SERVER } from '../constants/server';

const STORAGE_KEY = '@Fitbird:authCookieHeader';

// Send auth or authorize?
function send() {
  return {
    type: actionTypes.AUTH_SEND
  };
}

// Verify cookie?
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
    dispatch({ type: actionTypes.AUTH_STORE_COOKIE });

    CookieManager.getCookieHeader(`${SERVER}/`, (cookie) => {
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
}

export function authByCookie() {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_BY_COOKIE });

    AsyncStorage.getItem(STORAGE_KEY, (err, cookie) => {
      if (cookie) {
        CookieManager.setFromHeader(`${SERVER}/`, cookie, () => {
          dispatch(checkCookie());
        });
      } else {
        dispatch({ type: actionTypes.AUTH_BY_COOKIE_FAIL });
      }
    });
  };
}

// Clear cookie?
export function clear() {
  AsyncStorage.removeItem(STORAGE_KEY)
    .then(() => {
      CookieManager.clearAll(() => {});
    });

  return {
    type: actionTypes.AUTH_CLEAR
  };
}

export function login(email, password) {
  return (dispatch) => {
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
}

export function logout() {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
}
