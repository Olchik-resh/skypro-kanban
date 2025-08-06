<template>
  <div class="main__column column">
    <div class="column__title" v-for="(title, index) in columnTitles" :key="index">
      <p>{{ title }}</p>
    <TaskCard v-for="(card, index) in cards" :key="index" :card="card" />
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
