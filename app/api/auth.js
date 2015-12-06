import { LOGIN_CHECK, LOGIN_EMAIL } from '../constants/api_routes';

export function check() {
  return fetch(LOGIN_CHECK, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': '',
      'Host': 'app.fitbird.com'
    }
  });
}

export function loginEmail(email, password){
  return fetch(LOGIN_EMAIL, {
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
  });
}
