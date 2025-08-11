<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <TaskColumn :tasks="noStatusTask" title="Без статуса" />
          <TaskColumn :tasks="doStatusTask" title="Нужно сделать" />
          <TaskColumn :tasks="workStatusTask" title="В работе" />
          <TaskColumn :tasks="testStatusTask" title="Тестирование" />
          <TaskColumn :tasks="readyStatusTask" title="Готово" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import TaskColumn from './TaskColumn.vue'

</script>

<style lang="scss" scoped></style>
