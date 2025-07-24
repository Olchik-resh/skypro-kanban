<template>
  <div>
    <columnTitle title="Без статуса" />
    <Column title="Нужно сделать" />
    <Column title="В работе" />
    <Column title="Тестирование" />
    <Column title="Готово" />
  </div>
</template>

<script setup>
import columnTitle from './TaskColumn.vue' // Ваш компонент с колонкой
</script>
