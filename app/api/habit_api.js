import HEADERS from '../constants/headers';
import { SERVER } from '../constants/server';

export function check(id, occurence) {
  return fetch(`${SERVER}/habit/${id}/${occurence.week}/${occurence.day}/check`, {
    method: 'POST',
    headers: HEADERS
  });
}

export function fetchAll() {
  return fetch(`${SERVER}/habit/all`, {
    method: 'GET',
    headers: HEADERS
  });
}

export function fetchStarted() {
  return fetch(`${SERVER}/habit/started`, {
    method: 'GET',
    headers: HEADERS
  });
}

export function start(id) {
  return fetch(`${SERVER}/habit/${id}/start`, {
    method: 'POST',
    headers: HEADERS
  });
}
