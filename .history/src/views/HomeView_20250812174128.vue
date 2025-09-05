<template>
  <main>
    <RouterView />
    <BaseHeader />

    <div class="wrapper" :loading="loading">
      <!-- Плавное появление колонок с карточками -->
      <Transition name="fade">
        <div v-if="!loading">
          <TaskDesk :loading="loading" :tasks="tasks" :error="error" />
        </div>
      </Transition>

      <!-- Отображение лоадера -->
      <div class="loader" v-if="loading">
        Данные загружаются<span class="dots">.</span><span class="dots">.</span
        ><span class="dots">.</span>
      </div>
    </div>
  </main>
</template>

<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import { inject, provide, ref, watch } from 'vue'
import { onMounted, ref } from 'vue'

const tasks = ref([])
const loading = ref(true)
const error = ref('')

const getTasks = async () => {
  try {
    loading.value = true
    const token = localStorage.getItem('authToken')
    if (!token) {
      // Перенаправить на страницу входа
      return
    }
    const response = await fetch('/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.status === 401) {
      // Токен истёк, перенаправить на страницу входа
      return
    }
    const data = await response.json()
    if (data) tasks.value = data
  } catch (err) {
    error.value = err.message
    console.error('Ошибка при получении задач:', error)
  } finally {
    loading.value = false
  }
}

onMounted(getTasks)
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.loader {
  text-align: center;
  margin-top: 20px;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  color: #94a6be;
}
.loader .dots:nth-child(1) {
  animation: dot-blink 1s ease infinite;
}

.loader .dots:nth-child(2) {
  animation: dot-blink 1s ease infinite;
  animation-delay: 0.2s;
}

.loader .dots:nth-child(3) {
  animation: dot-blink 1s ease infinite;
  animation-delay: 0.4s;
}

@keyframes dot-blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
