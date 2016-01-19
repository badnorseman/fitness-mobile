import * as types from './action_types';
import { appError, appReceive } from './app_actions';
import { request } from './network_actions';
import CookieManager from 'react-native-cookies';
import { AsyncStorage } from 'react-native';
import { check, loginEmail } from '../api/auth';
import { API } from '../constants/api_routes';
const STORAGE_KEY = '@Fitbird:authCookieHeader';

function send() {
  return {
    type: types.AUTH_SEND
  };
}

export function checkCookie() {
  return (dispatch) => {
    return request(check())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(json, types.AUTH_BY_COOKIE_SUCCESS, types.AUTH_BY_COOKIE_FAIL));
      })
      .catch(error => appError(error));
  };
}

export function authByCookie() {
  return (dispatch) => {
    dispatch({ type: types.AUTH_BY_COOKIE });

    AsyncStorage.getItem(STORAGE_KEY, (err, cookie) => {
      if (cookie) {
        CookieManager.setFromHeader(`${API}/`, cookie, () => {
          dispatch(checkCookie());
        });
      } else {
        dispatch({ type: types.AUTH_BY_COOKIE_FAIL });
      }
    });
  };
}

export function storeCookie() {
  return (dispatch) => {
    dispatch({ type: types.AUTH_STORE_COOKIE });

    CookieManager.getCookieHeader(`${API}/`, (cookie) => {
      if (!cookie) {
        dispatch({ type: types.AUTH_STORE_COOKIE_FAIL });
        return;
      }

      try {
        AsyncStorage.setItem(STORAGE_KEY, cookie, () => {
          dispatch({ type: types.AUTH_STORE_COOKIE_SUCCESS });
        });
      } catch (error) {
        dispatch({ type: types.AUTH_STORE_COOKIE_FAIL });
      }
    });
  };
}

export function clear() {
  AsyncStorage.removeItem(STORAGE_KEY)
    .then(() => {
      CookieManager.clearAll(() => {});
    });

  return {
    type: types.AUTH_CLEAR
  };
}

export function logout() {
  return {
    type: types.AUTH_LOGOUT
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
          types.AUTH_SUCCESS,
          types.AUTH_FAIL
        ));
      })
      .catch(error => appError(error));
  };
}
