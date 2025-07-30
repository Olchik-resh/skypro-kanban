<script setup lang="ts">
import BaseHeader from './BaseHeader.vue'
import ExitMod from './ExitModal.vue'
import NewCardMod from './NewCardModal.vue'
import TaskDesk from './TaskDesk.vue'
import TaskMod from './TaskMod.vue'
</script>

<template>
  <div class="wrapper">
    <!-- pop-up start-->
    <ExitMod />
    <NewCardMod />
    <TaskMod />
    <!-- pop-up end-->
    <BaseHeader />
    <TaskDesk />
  </div>
</template>
