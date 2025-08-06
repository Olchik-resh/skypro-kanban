<script setup lang="ts">
import BaseHeader from './BaseHeader.vue'
import ExitModel from './ExitModal.vue'
import NewCardModel from './NewCardModal.vue'
import TaskDesk from './TaskDesk.vue'
import TaskModel from './TaskModal.vue'
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
