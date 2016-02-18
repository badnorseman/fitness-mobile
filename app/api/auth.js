import HEADERS from '../constants/headers';
import { SERVER } from '../constants/server';

export function check() {
  return fetch(`${SERVER}/login/check`, {
    method: 'GET',
    headers: HEADERS
  });
}

export function loginEmail(email, password){
  return fetch(`${SERVER}/login/email`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      'email': email,
      'password': password
    })
  });
}
