import HEADERS from '../constants/headers'
import SERVER from '../constants/server'

export const check = (id, occurence) => {
  return fetch(`${SERVER}/habit/${id}/${occurence.week}/${occurence.day}/check`, {
    method: 'POST',
    headers: HEADERS
  })
}

export const fetchAll = () => {
  return fetch(`${SERVER}/habit/all`, {
    method: 'GET',
    headers: HEADERS
  })
}

export const fetchStarted = () => {
  return fetch(`${SERVER}/habit/started`, {
    method: 'GET',
    headers: HEADERS
  })
}

export const start = (id) => {
  return fetch(`${SERVER}/habit/${id}/start`, {
    method: 'POST',
    headers: HEADERS
  })
}
