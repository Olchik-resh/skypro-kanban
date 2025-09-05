import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/user'

export async function signIn(userData) {
  try {
    const data = await axios.post(API_URL + '/login', JSON.stringify(userData), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data.data.user
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export async function signUp({ name, login, password }) {
  try {
    const data = await axios.post(API_URL, JSON.stringify({ name, login, password }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data.data.user
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}
