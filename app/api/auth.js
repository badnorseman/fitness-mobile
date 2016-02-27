import HEADERS from '../constants/headers'
import SERVER from '../constants/server'

export const check = () => {
  return fetch(`${SERVER}/login/check`, {
    method: 'GET',
    headers: HEADERS
  })
}

export const loginEmail = (email, password) => {
  return fetch(`${SERVER}/login/email`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      email,
      password
    })
  })
}
