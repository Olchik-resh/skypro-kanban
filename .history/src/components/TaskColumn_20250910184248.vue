<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div v-if="!tasks.length" class="column__task">Задач нет</div>
    <TaskCard v-else v-for="task in tasks" :key="task.id" v-bind="task" />
  </div>
</template>
<script setup>
import TaskCard from './TaskCard.vue'
defineProps({ tasks: { type: Array, required: true }, title: { type: String, required: true } })
</script>
<style lang="scss" scoped>
.main__column {
  width: 20%;
  margin: 0 auto;
  display: block;
}
.column__title {
  padding: 0 10px;
  margin: 15px 0;
}
.column__title p {
  color: #94a6be;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}
</style>
