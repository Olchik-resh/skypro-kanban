<template>
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
</script>