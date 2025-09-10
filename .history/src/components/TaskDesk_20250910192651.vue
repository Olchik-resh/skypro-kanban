<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <TaskColumn
            v-for="(tasks, status) in statusGroups"
            :key="status"
            :tasks="tasks"
            :title="status"
            :isLoading="isLoading"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import TaskColumn from './TaskColumn.vue'
import { ref, onMounted, defineProps, computed } from 'vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  isoading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
})

const tasks = ref([])
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    tasks.value = [
      { id: 1, title: 'Задача 1', description: 'Описание задачи 1', deadline: '2023-12-31' },
    ]
    isLoading.value = false
  }, 2000)
})

const statusGroups = computed(() => ({
  'Без статуса': props.tasks.filter((el) => el?.status === 'Без статуса'),
  'Нужно сделать': props.tasks.filter((el) => el?.status === 'Нужно сделать'),
  'В работе': props.tasks.filter((el) => el?.status === 'В работе'),
  Тестирование: props.tasks.filter((el) => el?.status === 'Тестирование'),
  Готово: props.tasks.filter((el) => el?.status === 'Готово'),
}))
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  background-color: #eaeef6;
  z-index: 1;
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

.taskNo {
  display: none;
}
</style>
