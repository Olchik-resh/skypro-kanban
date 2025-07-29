<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <TaskColumn :tasks="noStatusTask" title="Без статуса" />
          <TaskColumn :tasks="doStatusTask" title="Нужно сделать" />
          <TaskColumn :tasks="workStatusTask" title="В работе" />
          <TaskColumn :tasks="testStatusTask" title="Тестирование" />
          <TaskColumn :tasks="readyStatusTask" title="Готово" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getTasks } from './mokcs/tasks.js'
import TaskColumn from './TaskColumn.vue'

const tasks = ref([])

onMounted(() => {
  tasks.value = getTasks()
})
const noStatusTask = computed(() => {
  return tasks.value.filter((task) => task.status.includes('Без статуса'));
});
const doStatusTask = computed(() => {
  return tasks.value.filter((task) => task.status.includes('Нужно сделать'));
});

const workStatusTask = computed(() => {
  return tasks.value.filter((task) => task.status.includes'В работе')
})

const testStatusTask = computed(() => {
  return tasks.value.filter((task) => task.status === 'Тестирование')
})

const readyStatusTask = computed(() => {
  return tasks.value.filter((task) => task.status === 'Готово')
})
</script>

<style lang="scss" scoped></style>
