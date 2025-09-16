<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div class="column__cards-wrapper" :class="{ 'column__cards--loading': loading }">
      <TaskCard
        v-for="task in tasks"
        :key="task._id || task.id"
        v-bind="task"
        :isLoading="loading"
      />

      <div v-if="tasks.length === 0 && !loading" class="column__empty">Нет задач</div>

      <div v-if="loading" class="column__overlay"></div>
    </div>

    <div v-if="tasks.length === 0 && loading">
      <TaskCardSkeleton v-for="n in lastTasksCount || 3" :key="n" />
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
  padding-left: 10px;
}
@media screen and (max-width: 660px) {
  .column__cards-wrapper {
    display: inline-flex;
  }
  .main__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
  }
  .column__title p {
    font-size: 12px;
    font-weight: 600;
  }
}

@media screen and (max-width: 495px) {
}
</style>
