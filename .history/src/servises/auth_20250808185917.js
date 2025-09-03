import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/user'

export async function signIn(userData) {
  try {
    const data = await axios.post(API_URL + '/login', new URLSearchParams(userData).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return data.data.user
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export async function signUp({ name, login, password }) {
  try {
    const data = await axios.post(
      API_URL,
      new URLSearchParams({ name, login, password }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    return data.data.user
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}
