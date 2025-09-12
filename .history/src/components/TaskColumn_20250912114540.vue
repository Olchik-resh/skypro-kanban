<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div class="column__cards-wrapper" :class="{ 'column__cards--loading': loading }">
      <!-- Карточки (если есть) -->
      <TaskCard
        v-for="task in tasks"
        :key="task._id || task.id"
        v-bind="task"
        :isLoading="loading"
      />
      <!-- Нет задач -->
      <div v-if="tasks.length === 0 && !loading" class="column__empty">Нет задач</div>
      <!-- Оверлей-лоадер (если загрузка) -->
      <div v-if="loading" class="column__overlay">
        <!-- можно вставить спиннер, или оставить просто полупрозрачный слой -->
      </div>
    </div>
    <!-- Если задач нет и загрузка, можно дополнительно рендерить 1-2 скелетона, если хочешь -->
    <div v-if="tasks.length === 0 && loading">
      <TaskCardSkeleton v-for="n in 3" :key="n" />
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
  loading: Boolean,
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
