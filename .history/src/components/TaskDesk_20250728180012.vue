<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <TaskColumn :tasks="tasks" title="Без статуса" status="Без статуса" />
          <TaskColumn :tasks="tasks" title="Нужно сделать" status="Нужно сделать" />
          <TaskColumn :tasks="tasks" title="В работе" status="В работе" />
          <TaskColumn :tasks="tasks" title="Тестирование" status="Тестирование" />
          <TaskColumn :tasks="tasks" title="Готово" status="Готово" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import TaskColumn from './TaskColumn.vue'
import { getTasks } from './mokcs/tasks.js'
const tasks = ref([])
// const noStatusTask = computed(() => {
//   return tasks.value.filter((el) => {
//     return el.status === 'Без статуса'
//   })
// })

// const doStatusTask = computed(() => {
//   return tasks.value.filter((el) => {
//     return el.status === 'Нужно сделать'
//   })
// })

// const workStatusTask = computed(() => {
//   return tasks.value.filter((el) => {
//     return el.status === 'В работе'
//   })
// })
// const testStatusTask = computed(() => {
//   return tasks.value.filter((el) => {
//     return el.status === 'Тестирование'
//   })
// })
// const readyStatusTask = computed(() => {
//   return tasks.value.filter((el) => {
//     return el.status === 'Готово'
//   })
// })
// onMounted(() => {
//   tasks.value = getTasks()
// })
</script>

<!-- <script setup>
import { ref, onMounted } from 'vue';
import TaskColumn from './TaskColumn.vue';
import { getTasks } from './mokcs/tasks.js';

const tasks = ref([]);

onMounted(() => {
  tasks.value = getTasks();
});
</script> -->

<style lang="scss" scoped></style>
