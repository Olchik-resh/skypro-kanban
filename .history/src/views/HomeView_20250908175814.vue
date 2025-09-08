<template>
  <main>
    <RouterView />
    <BaseHeader />

    <Transition name="slide-fade">
      <div v-if="isOffline" class="network-error">
        Нет подключения к интернету. Проверьте сеть и попробуйте снова.
        <button @click="retryFetch">Повторить попытку</button>
      </div>
    </Transition>

    <div class="wrapper" :loading="loading">
      <!-- Плавное появление колонок с карточками -->
      <Transition name="fade">
        <div v-if="!loading">
          <TaskDesk :loading="loading" :tasks="tasks" :error="error" @retry="getTasks" />
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
import { fetchTasks } from '@/servises/api'
import { inject, onMounted, onUnmounted, provide, ref, watch } from 'vue'

const tasks = ref([])
const loading = ref(false)
const error = ref('')
const isOffline = ref(false)
const { userInfo } = inject('auth')

// Добавляем обработчики сетевого статуса
const updateNetworkStatus = () => {
  isOffline.value = !navigator.onLine
  if (!isOffline.value && error.value.includes('интернет')) {
    error.value = ''
  }
}

onMounted(() => {
  window.addEventListener('online', updateNetworkStatus)
  window.addEventListener('offline', updateNetworkStatus)
  updateNetworkStatus()
})

onUnmounted(() => {
  window.removeEventListener('online', updateNetworkStatus)
  window.removeEventListener('offline', updateNetworkStatus)
})

provide('tasksData', { tasks, loading, error, isOffline })


const getTasks = async () => {
  if (!userInfo.value?.token) {
    error.value = 'Отсутствует токен авторизации'
    return
  }
  try {
    loading.value = true
    const data = await fetchTasks({
      token: userInfo.value.token,
    })

    if (data) tasks.value = data
  } catch (err) {
    error.value = err.message || String(err)
    console.error('Ошибка при получении задач:', error)
  } finally {
    loading.value = false
  }
}

watch(userInfo, getTasks, { immediate: true })
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
