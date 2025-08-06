const tasks = [
  { id: 1, top: 'Web Design', title: 'Название задачи', date: '30.10.23', status: 'Без статуса' },
  { id: 2, top: 'Research', title: 'Название задачи', date: '30.10.23', status: 'Без статуса' },
  {
    id: 3,
    top: 'Copywriting',
    title: 'Название задачи',
    date: '30.10.23',
    status: 'Без статуса',
  },
]

const statusList = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
]; 

export function getStatusList() {
  return statusList
};

export function getTasks() {
  return tasks
}
