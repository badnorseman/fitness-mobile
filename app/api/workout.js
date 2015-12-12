import HEADERS from '../constants/headers';
import { API, WORKOUT_END } from '../constants/api_routes';

export function end(type, comments) {
  return fetch(WORKOUT_END, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      'type': type,
      'comments': comments
    })
  });
}

export function updateFeedback(id, type, comments) {
  // TODO: Have this taken care of by a utility
  return fetch(`${API}/workout/${id}/feedback`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      'type': type,
      'comments': comments
    })
  });
}

export function start(id) {
  return fetch(`${API}/workout/${id}/start`, {
    method: 'POST',
    headers: HEADERS
  });
}

export function check(id) {
  return fetch(`${API}/workout/set/${id}/check`, {
    method: 'POST',
    headers: HEADERS
  });
}

export function checkWithValue(id, value) {
  return fetch(`${API}/workout/set/${id}/check-with-value`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      value: value
    })
  });
}
