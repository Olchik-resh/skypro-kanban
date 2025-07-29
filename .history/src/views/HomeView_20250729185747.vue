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
  }, 2000)
})
</script>

<template>
  <main>
    <div class="wrapper">
      <!-- pop-up start-->

      <div class="pop-exit" id="popExit">
        <ExitModal />
      </div>

      <div class="pop-new-card" id="popNewCard">
        <NewCardModal />
      </div>

      <div class="pop-browse" id="popBrowse">
        <
      </div>

      <!-- pop-up end-->
      <BaseHeader />
      <div class="loader" v-if="loading">Данные загружаются...</div>
      <TaskDesk v-else :loading="loading" />
    </div>
  </main>
</template>
