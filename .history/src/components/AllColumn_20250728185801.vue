 <!-- <script setup>
import { ref, onMounted, computed } from 'vue';
import { getTasks } from './mokcs/tasks.js';

const allTasks = ref([]);

onMounted(() => {
  allTasks.value = getTasks();
});

// Создаём вычисляемые свойства для каждой колонки
const noStatusTask = computed(() => {
  return allTasks.value.filter((task) => task.status === 'Без статуса');
});

const doStatusTask = computed(() => {
  return allTasks.value.filter((task) => task.status === 'Нужно сделать');
});

// И так далее для каждой колонки...
</script> -->