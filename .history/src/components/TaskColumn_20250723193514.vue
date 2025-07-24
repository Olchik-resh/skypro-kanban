<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ columnTitle }}</p>
    </div>
    <TaskCard :title="columnTitle" />
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'

const columnTitle = 'Название колонки'
</script>
