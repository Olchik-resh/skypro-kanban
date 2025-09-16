<template>
  <div class="loader-spinner">
    <span class="loader"></span>
  </div>
</template>
<style scoped>
.loader-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
}

.loader {
  width: 32px;
  height: 32px;
  border: 4px solid #cfd0d1;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
