<template>
  <div class="main__column column">
    <div class="column__title" v-for="(title, index) in columnTitles" :key="index">
      <p>{{ title }}</p>
    <TaskCard />
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'
const columnTitle = 'Без статуса'
</script>

<style lang="scss" scoped></style>
