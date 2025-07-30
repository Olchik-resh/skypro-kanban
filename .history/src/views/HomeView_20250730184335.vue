<template>
  <main>
    <BaseHeader />

    <div class="wrapper" :loading="loading">
      <!-- Плавное появление колонок с карточками -->
      <Transition name="fade">
        <div v-if="!loading">
          <!-- pop-up start-->
          <div class="pop-exit" id="popExit">
            <ExitModal />
          </div>

          <div class="pop-new-card" id="popNewCard">
            <NewCardModal />
          </div>

          <div class="pop-browse" id="popBrowse">
            <TaskModal />
          </div>
          <!-- pop-up end-->

          <TaskDesk />

          <!-- Проверка наличия карточек -->
          <div v-if="!hasCards" class="no-tasks">Задач нет</div>
        </div>
      </Transition>

      <!-- Отображение лоадера -->
      <div class="loader" v-if="loading">Данные загружаются...</div>
    </div>
  </main>
</template>

<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import TaskModal from '@/components/TaskModal.vue'
import ExitModal from '@/components/ExitModal.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import { onMounted, ref } from 'vue'

const loading = ref(true)
const cardsActive = ref(false)
const hasCards = true // Измените это значение в зависимости от наличия карточек

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
</style>
