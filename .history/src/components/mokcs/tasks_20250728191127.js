const tasks = [
  { id: 1, topic: 'Web Design', title: 'Название задачи', date: '30.10.23', status: ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'] },
  { id: 2, topic: 'Research', title: 'Название задачи', date: '30.10.23', status: ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'] },
  { id: 3, topic: 'Copywriting', title: 'Название задачи', date: '30.10.23', status: 'Готово' },
]

export function getTasks() {
  return tasks
}
