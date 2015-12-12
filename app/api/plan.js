import HEADERS from '../constants/headers';
import { PLAN } from '../constants/api_routes';

export function load() {
  return fetch(PLAN, {
    method: 'GET',
    headers: HEADERS
  });
}
