<template>
  <div class="skeleton">
    <div class="task-card-skeleton">
      <div class="skeleton-title"></div>
      <div class="skeleton-description"></div>
      <div class="skeleton-deadline"></div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.task-card-skeleton {
  width: 220px;
  height: 130px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
  ma
}

.skeleton-title,
.skeleton-description,
.skeleton-deadline {
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-title {
  width: 82px;
  height: 20px;
  border-radius: 18px;
}

.skeleton-description {
  font-weight: 500;
  line-height: 18px;
  margin-bottom: 10px;
}

.skeleton-deadline {
  height: 13px;
  width: 59px;
  margin-left: 13px;
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
