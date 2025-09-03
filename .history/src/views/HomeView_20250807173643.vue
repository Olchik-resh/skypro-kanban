<template>
  <main>
    <RouterView />
    <BaseHeader />

    <div class="wrapper" :loading="loading">
      <!-- Плавное появление колонок с карточками -->
      <Transition name="fade">
        <div v-if="!loading">
          <TaskDesk />

          <!-- Проверка наличия карточек -->
          <div v-if="!hasCards" class="no-tasks">Задач нет</div>
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
import { onMounted, ref } from 'vue'

const tasks = ref([])
const loading = ref(true)
const error = ref('')

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    cardsActive.value = true
  }, 1000)
})
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
