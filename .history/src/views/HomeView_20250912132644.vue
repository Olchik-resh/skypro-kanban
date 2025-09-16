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
      <Transition name="fade">
        <TaskDesk :loading="loading" :tasks="tasks" :error="error" @retry="getTasks" />
      </Transition>
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
  if (isOffline.value) {
    error.value = 'Ошибка: устройство не подключено к интернету'
    return
  }
  try {
    loading.value = true
    error.value = ''
    const data = await fetchTasks({
      token: userInfo.value.token,
    })
    tasks.value = data
  } catch (err) {
    handleFetchError(err)
  } finally {
    loading.value = false
  }
}

const handleFetchError = (err) => {
  if (err.name === 'OfflineError' || !navigator.onLine) {
    error.value = 'Нет подключения к интернету. Проверьте сеть.'
    isOffline.value = true
  } else if (err.response?.status === 401) {
    error.value = 'Сессия истекла. Требуется повторная авторизация.'
  } else {
    error.value = err.message || 'Ошибка при загрузке задач'
  }

  console.error('Ошибка при получении задач:', err)
}

const retryFetch = () => {
  isOffline.value = false
  error.value = ''
  getTasks()
}

watch(userInfo, getTasks, { immediate: true })
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.network-error {
    background-color: #eaeef6;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    te
}
</style>
