<template>
  <main>
    <Transition name="fade">
      <div class="loader" v-if="loading">Данные загружаются...</div>
      <div class="wrapper" v-else :loading="loading">
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
        <BaseHeader />

        <TaskDesk />
      </div>
    </Transition>
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
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 000)
})
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
</style>
