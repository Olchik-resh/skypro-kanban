<template>
  <div class="main__column column">
    <div class="column__title">
      <p class="title-inline">{{ columnTitle }}</p>
      <p>{{ columnTitle }}</p>
    </div>
    <TaskCard />
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'
const columnTitle = 'Без статуса'
</script>

<style lang="scss" scoped></style>
