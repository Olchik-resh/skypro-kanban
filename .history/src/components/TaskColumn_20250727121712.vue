<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
      <TaskCard v-for="task in tasks" :key="task.id" v-bind="task" />
    </div>
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue'

export default {
  components: {
    TaskCard,
  },
  data() {
    return {
      columnTitles: ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'],
      cards: [
        { id: 1, title: 'Задача 1' },
        { id: 2, title: 'Задача 2' },
        { id: 3, title: 'Задача 3' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
