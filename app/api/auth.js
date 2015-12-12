import HEADERS from '../constants/headers';
import { LOGIN_CHECK, LOGIN_EMAIL } from '../constants/api_routes';

export function check() {
  return fetch(LOGIN_CHECK, {
    method: 'GET',
    headers: HEADERS
  });
}

export function loginEmail(email, password){
  return fetch(LOGIN_EMAIL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      'email': email,
      'password': password
    })
  });
}
