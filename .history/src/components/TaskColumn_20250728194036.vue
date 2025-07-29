<template>
  <TaskColumn :tasks="tasks" title="Без статуса" />
  <TaskColumn :tasks="tasks" title="Нужно сделать" />
  <TaskColumn :tasks="tasks" title="В работе" />
  <TaskColumn :tasks="tasks" title="Тестирование" />
  <TaskColumn :tasks="tasks" title="Готово" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTasks } from './mokcs/tasks.js';
import TaskColumn from './TaskColumn.vue';

const tasks = ref([]);

onMounted(() => {
  tasks.value = getTasks();
});
</script>
<style lang="scss" scoped></style>
