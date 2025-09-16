<template>
  <div class="skeleton">
    <div class="task-card-skeleton">
     <di <div class="skeleton-title"></div>
      <div class="skeleton__btn"></div>>
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
  margin-bottom: 8px;
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
  padding-left: 13px;
  padding-top: 15px;
}

.skeleton__btn {
  width: 18px;
  height: 4px;
  margin-left: 185px;
}

.skeleton-description {
  width: 113px;
  height: 13px;
  padding-left: 13px;
  margin-top: 15px;
  margin-bottom: 10px;
}

.skeleton-deadline {
  height: 13px;
  width: 58px;
  padding-left: 13px;
  margin-top: 30px;
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
