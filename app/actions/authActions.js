import * as types from './actionTypes';
import { appError, appReceive } from './appActions';
import CookieManager from 'react-native-cookies';
import { AsyncStorage } from 'react-native';
const STORAGE_KEY = '@Fitbird:authCookie';

function send() {
  return {
    type: types.AUTH_SEND
  };
}

export function checkCookie() {
  return (dispatch, getState) => {
    return fetch('http://app.fitbird.com/api/login/check', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': 'app.fitbird.com'
      }
    })
      .then(response => response.json())
      .then(json => {
        // dispatch(appReceive(json, types.AUTH_CHECK_COOKIE_SUCCESS, types.AUTH_CHECK_COOKIE_FAIL));
        dispatch(appReceive(json, types.AUTH_BY_COOKIE_SUCCESS, types.AUTH_BY_COOKIE_FAIL));
      })
      .catch(error => appError(error));
  }
}

export function authByCookie() {
  return (dispatch, getState) => {
    dispatch(() => {
      type: types.AUTH_BY_COOKIE
    });

    AsyncStorage.getItem(STORAGE_KEY, (err, res) => {
      if(res){
        let cookie = JSON.parse(res);

        CookieManager.set({
          origin: '',
          version: '1',
          expiration: '3015-05-30T12:30:00.00-05:00', // Some ridiculous time in future
          ...cookie
        }, (err, res) => {
          dispatch(checkCookie());
        });
      } else {
        dispatch(() => {
          type: types.AUTH_BY_COOKIE_FAIL
        });
      }
    });
  };
}

export function storeCookie() {
  return (dispatch, getState) => {
    dispatch(() => {
      type: types.AUTH_STORE_COOKIE
    });

    CookieManager.getAll((cookie, res) => {
      if(!cookie || !cookie.SS){
        dispatch(() => {
          type: types.AUTH_STORE_COOKIE_FAIL
        });
        return;
      }

      try {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cookie.SS), () => {
          dispatch(() => {
            type: types.AUTH_STORE_COOKIE_SUCCESS
          });
        });
      } catch (error) {
        dispatch(() => {
          type: types.AUTH_STORE_COOKIE_FAIL
        });
      }
    });
  };
}

export function clear() {
  AsyncStorage.removeItem(STORAGE_KEY)
    .then(() => {
      CookieManager.clearAll(() => {})
    })
    .catch(error => {});

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
  return (dispatch, getState) => {
    dispatch(send());

    return fetch('http://app.fitbird.com/api/login/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': 'app.fitbird.com'
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    })
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
