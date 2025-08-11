import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/user'

export async function signUp({ name, , password }) {
  try {
    const data = await axios.post(
      API_URL,
      { name, email, password },
      {
        headers: {
          'Content-Type': '',
        },
      },
    )
    return data.data.user
  } catch (error) {
    console.error('Ошибка регистрации:', error)
    throw new Error(error.response.data.error || 'Ошибка регистрации')
  }
}

export async function signIn(userData) {
  try {
    const data = await axios.post(API_URL + '/email', userData, {
      headers: {
        'Content-Type': '',
      },
    })
    return data.data.user
  } catch (error) {
    alert('Ошибка авторизации:', error)
    throw new Error(error.response.data.error || 'Ошибка авторизации')
  }
}
