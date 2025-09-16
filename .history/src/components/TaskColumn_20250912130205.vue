<template>
  <div class="column">
    <div class="column__cards-wrapper">
      <TaskCard v-for="task in tasks" :key="task._id || task.id" v-bind="task" />
      <TaskCardSkeleton v-if="tasks.length === 0 && loading" v-for="n in 3" :key="n" />
      <div v-if="tasks.length === 0 && !loading">Нет задач</div>
      <div v-if="tasks.length > 0 && loading" class="column__overlay">Обновление…</div>
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
.column__cards-wrapper {
  position: relative;
  transition: filter 0.2s;
}
.column__cards--loading {
  filter: blur(2px);
  pointer-events: none;
  opacity: 0.7;
}
.column__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
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
.column__empty {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  color: #94a6be;
  font-size: 14px;
}
</style>
