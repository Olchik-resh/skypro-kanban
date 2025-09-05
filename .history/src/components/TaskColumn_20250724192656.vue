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
