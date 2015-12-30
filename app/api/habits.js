import HEADERS from '../constants/headers';
import { API, HABITS_ALL, HABITS_STARTED } from '../constants/api_routes';

export function loadAll() {
  return fetch(HABITS_ALL, {
    method: 'GET',
    headers: HEADERS
  });
}

export function loadStarted() {
  return fetch(HABITS_STARTED, {
    method: 'GET',
    headers: HEADERS
  });
}

export function check(id, occurence) {
  return fetch(`${API}/habit/${id}/${occurence.week}/${occurence.day}/check`, {
    method: 'POST',
    headers: HEADERS
  });
}

export function start(id) {
  return fetch(`${API}/habit/${id}/start`, {
    method: 'POST',
    headers: HEADERS
  });
}
