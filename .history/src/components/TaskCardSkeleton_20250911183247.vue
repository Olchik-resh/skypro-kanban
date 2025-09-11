<template>
  <div class="task-card-skeleton">
    <div class="skeleton-title"></div>
    <div class="skeleton-description"></div>
    <div class="skeleton-deadline"></div>
  </div>
</template>

<script setup></script>

<style scoped>
.task-card-skeleton {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
  height: 150px; /* Примерная высота карточки */
}

.skeleton-title,
.skeleton-description,
.skeleton-deadline {
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-title {
  height: 20px;
  width: 80%;
  margin-bottom: 10px;
}

.skeleton-description {
  height: 60px;
  width: 100%;
  margin-bottom: 10px;
}

.skeleton-deadline {
  height: 20px;
  width: 50%;
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
</style>
