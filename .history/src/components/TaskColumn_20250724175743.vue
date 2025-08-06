<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ columnTitle }}</p>
    </div>
    <TaskCard />
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'
defineProps({
  columnTitle: String,
})
</script>

<style lang="scss" scoped></style>
