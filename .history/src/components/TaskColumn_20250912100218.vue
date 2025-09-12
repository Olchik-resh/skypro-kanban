<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>

    <!-- Если загрузка и задач нет — скелетоны -->
    <div v-if="loading && tasks.length === 0">
      <TaskCardSkeleton v-for="n in 3" :key="n" />
    </div>

    <!-- Если загрузка и задачи есть — карточки, но в "загрузочном" состоянии -->
    <div v-else-if="loading && tasks.length > 0">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        v-bind="task"
        :loading="loading && tasks.length > 0"
      />
    </div>

    
    <div v-else>
      <TaskCard v-for="task in tasks" :key="task.id" v-bind="task" />
    </div>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'
import TaskCardSkeleton from './TaskCardSkeleton.vue'
defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
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
.column__task {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  color: #94a6be;
  font-size: 14px;
  font-weight: 600;
  padding: 0 10px;
}
</style>
