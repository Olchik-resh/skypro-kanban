<script setup lang="ts">
import BaseHeader from './BaseHeader.vue'
import ExitModl from './ExitModal.vue'
import NewCardModal from './NewCardModal.vue'
import TaskDesk from './TaskDesk.vue'
import TaskModal from './TaskModal.vue'
</script>

<template>
  <div class="wrapper">
    <!-- pop-up start-->
    <ExitModal />
    <NewCardModal />
    <TaskModal />
    <!-- pop-up end-->
    <BaseHeader />
    <TaskDesk />
  </div>
</template>
