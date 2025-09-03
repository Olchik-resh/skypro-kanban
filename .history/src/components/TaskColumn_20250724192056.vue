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
  data() {
    return {
      columnTitles: ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
