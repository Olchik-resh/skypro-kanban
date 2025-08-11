<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
      <TaskCard v-for="task in tasks" :key="task.id" v-bind="task" />
    </div>
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue'


</script>

<style lang="scss" scoped></style>
