import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/kanban'

export async function fetchTasks({ token }) {
  try {
    const data = await axios.get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data.data.tasks
  } catch (error) {
    console.log(error) 
    throw new Error(error.message)
  }
}

export async function postTask({ token, task }) {
  try {
    const data = await axios.post(API_URL, task, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json', 
      },
    })
    return data.data.tasks
  } catch (error) {
    console.log(error) // Добавьте логирование ошибки
    throw new Error(error.message)
  }
}

export async function editTask({ token, id, task }) {
  try {
    const data = await axios.put(API_URL + id, task, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json', // Укажите правильный Content-Type
      },
    })
    return data.data.tasks
  } catch (error) {
    console.log(error) // Добавьте логирование ошибки
    throw new Error(error.message)
  }
}
