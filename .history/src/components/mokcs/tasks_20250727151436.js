const tasks = [
  { id: 1, topic: 'Web Design', title: 'Название задачи', date: '30.10.23', status: 'Без статуса' },
  { id: 2, topic: 'Research', title: 'Название задачи', date: '30.10.23', status: 'В работе' },
  { id: 3, topic: 'Copywriting', title: 'Название задачи', date: '30.10.23', status: 'Готово' },
]

export const noStatusTask = tasks.filter(task => task.status === 'Без статуса');
const doStatusTask = tasks.filter(task => task.status === 'Нужно сделать');
const workStatusTask = tasks.filter(task => task.status === 'В работе');
const testStatusTask = tasks.filter(task => task.status === 'Тестирование');
const readyStatusTask = tasks.filter(task => task.status === 'Готово');

export function getTasks() {
  return tasks
}
