import HEADERS from '../constants/headers'
import SERVER from '../constants/server'

export const check = (id) => {
  return fetch(`${SERVER}/workout/set/${id}/check`, {
    method: 'POST',
    headers: HEADERS
  })
}

export const checkWithValue = (id, value) => {
  return fetch(`${SERVER}/workout/set/${id}/check-with-value`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      value
    })
  })
}

export const end = (type, comments) => {
  return fetch(`${SERVER}/workout/end`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      type,
      comments
    })
  })
}

export const loadAll = () => {
  return fetch(`${SERVER}/plan`, {
    method: 'GET',
    headers: HEADERS
  })
}

export const start = (id) => {
  return fetch(`${SERVER}/workout/${id}/start`, {
    method: 'POST',
    headers: HEADERS
  })
}

export const update = (id, field, value) => {
  return fetch(`${SERVER}/workout/set/${id}/update`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      fieldName: field,
      fieldValue: value
    })
  })
}

export const updateFeedback = (id, type, comments) => {
  // TODO: Have this taken care of by a utility
  return fetch(`${SERVER}/workout/${id}/feedback`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      type,
      comments
    })
  })
}
