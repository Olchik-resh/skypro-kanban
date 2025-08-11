<script setup lang="ts">
import BaseHeader from './BaseHeader.vue'
import ExitModel from './ExitMod.vue'
import NewCardModel from './NewCardMod.vue'
import TaskDesk from './TaskDesk.vue'
import TaskModel from './TaskMod.vue'
</script>

<template>
  <div class="wrapper">
    <!-- pop-up start-->
    <ExitModel />
    <NewCardModel />
    <TaskMod />
    <!-- pop-up end-->
    <BaseHeader />
    <TaskDesk />
  </div>
</template>
