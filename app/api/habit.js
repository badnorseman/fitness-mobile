import HEADERS from '../constants/headers';
import { SERVER } from '../constants/server';

const check = (id, occurence) => {
  fetch(`${SERVER}/habit/${id}/${occurence.week}/${occurence.day}/check`, {
    method: 'POST',
    headers: HEADERS
  });
};

const fetchAll = () => {
  fetch(`${SERVER}/habit/all`, {
    method: 'GET',
    headers: HEADERS
  });
};

const fetchStarted = () => {
  fetch(`${SERVER}/habit/started`, {
    method: 'GET',
    headers: HEADERS
  });
};

const start = (id) => {
  fetch(`${SERVER}/habit/${id}/start`, {
    method: 'POST',
    headers: HEADERS
  });
};

export { check, fetchAll, fetchStarted, start };
