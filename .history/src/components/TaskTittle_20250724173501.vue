<template>
  <div>
    <columnTitle title="Без статуса" />
    <columnTitle title="Нужно сделать" />
    <columnTitle title="В работе" />
    <columnTitle title="Тестирование" />
    <Column title="Готово" />
  </div>
</template>

<script setup>
import columnTitle from './TaskColumn.vue' // Ваш компонент с колонкой
</script>
