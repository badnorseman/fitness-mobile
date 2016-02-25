import HEADERS from '../constants/headers';
import { SERVER } from '../constants/server';

export function check(id) {
  return fetch(`${SERVER}/workout/set/${id}/check`, {
    method: 'POST',
    headers: HEADERS
  });
}

export function checkWithValue(id, value) {
  return fetch(`${SERVER}/workout/set/${id}/check-with-value`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      value
    })
  });
}

export function end(type, comments) {
  return fetch(`${SERVER}/workout/end`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      type,
      comments
    })
  });
}

export function loadAll() {
  return fetch(`${SERVER}/plan`, {
    method: 'GET',
    headers: HEADERS
  });
}

export function start(id) {
  return fetch(`${SERVER}/workout/${id}/start`, {
    method: 'POST',
    headers: HEADERS
  });
}

export function update(id, field, value) {
  return fetch(`${SERVER}/workout/set/${id}/update`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      fieldName: field,
      fieldValue: value
    })
  });
}

export function updateFeedback(id, type, comments) {
  // TODO: Have this taken care of by a utility
  return fetch(`${SERVER}/workout/${id}/feedback`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      type,
      comments
    })
  });
}
