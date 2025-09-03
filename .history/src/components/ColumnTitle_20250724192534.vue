<!-- <template>
  <div>
    <TaskColumn v-for="(title, index) in columnTitles" :key="index" :title="title" />
  </div>
</template>

<script>
import TaskColumn from './TaskColumn.vue'

export default {
  components: {
    TaskColumn,
  },
  data() {
    return {
      columnTitles: ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'],
    }
  },
}
</script> -->

<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <TaskCard v-for="(card, index) in cards" :key="index" :card="card" />
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue'

export default {
  components: {
    TaskCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cards: [
        { id: 1, title: 'Задача 1' },
        { id: 2, title: 'Задача 2' },
        { id: 3, title: 'Задача 3' },
      ],
    }
  },
}
</script>
