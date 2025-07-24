<template>
  <div class="main__column column">
    <div class="column__title">
      <TaskColumn v-for="(title, index) in columnTitle" :key="index" :columnTitle="title" />
    </div>
    <TaskCard />
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'
const columnTitle = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']
</script>

<style lang="scss" scoped></style>
