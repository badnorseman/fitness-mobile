'use strict';
import HEADERS from '../constants/headers';
import { SERVER } from '../constants/server';

const check = (id, occurence) => {
  return fetch(`${SERVER}/habit/${id}/${occurence.week}/${occurence.day}/check`, {
    method: 'POST',
    headers: HEADERS
  });
};

const loadAll = () => {
  return fetch(`${SERVER}/habit/all`, {
    method: 'GET',
    headers: HEADERS
  });
};

const loadStarted = () => {
  return fetch(`${SERVER}/habit/started`, {
    method: 'GET',
    headers: HEADERS
  });
};

const start = (id) => {
  return fetch(`${SERVER}/habit/${id}/start`, {
    method: 'POST',
    headers: HEADERS
  });
};

export { check, loadAll, loadStarted, start };
