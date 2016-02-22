import HEADERS from '../constants/headers';
import { SERVER } from '../constants/server';

export function load() {
  return fetch(`${SERVER}/plan`, {
    method: 'GET',
    headers: HEADERS
  });
}
