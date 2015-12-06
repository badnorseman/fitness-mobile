import { PLAN } from '../constants/api_routes';

export function load() {
  return fetch(PLAN, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': '',
      'Host': 'app.fitbird.com'
    }
  });
}
