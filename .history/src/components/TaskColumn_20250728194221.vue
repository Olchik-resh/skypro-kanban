<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <TaskCard
      v-for="task in filteredTasks"
      :key="task.id"
      :title="task.title"
      :status="task.status"
      :topic="task.topic"
      :date="task.date"
    />
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'
import { computed } from 'vue'

defineProps({
  tasks: { type: Array, required: true },
  title: { type: String, required: true },
})

const filteredTasks = computed(() => {
  return tasks.value.filter((task) => task.status.includes(title))
})
</script>

<style lang="scss" scoped></style>
