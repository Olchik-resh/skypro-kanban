<script setup lang="ts">
import BaseHeader from './BaseHeader.vue'
import ExitModel from './ExitModel.vue'
import NewCardModel from './NewCardModel.vue'
import TaskDesk from './TaskDesk.vue'
import TaskModel from './TaskModel.vue'
</script>

<template>
  <div class="wrapper">
    <!-- pop-up start-->
    <ExitModel />
    <NewCardModel />
    <TaskModel />
    <!-- pop-up end-->
    <BaseHeader />
    <TaskDesk />
  </div>
</template>
