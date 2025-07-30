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
  return tasks.value.filter((task) => task.status.includes('Без статуса'))
})
const doStatusTask = computed(() => {
  return tasks.value.filter((task) => task.status.includes('Нужно сделать'))
})

const workStatusTask = computed(() => {
  return tasks.value.filter((task) => task.status.includes('В работе'))
})

const testStatusTask = computed(() => {
  return tasks.value.filter((task) => task.status.includes('Тестирование'))
})

const readyStatusTask = computed(() => {
  return tasks.value.filter((task) => task.status.includes('Готово'))
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  background-color: #eaeef6;
}
.main__block {
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
}
.main__content {
  width: 100%;
  display: flex;
}
#message {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
</style>
