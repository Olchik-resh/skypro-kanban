<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <TaskCard />
  </div>
</template>

<script>

export default {
  props: ['title'],
}
</script>

<style lang="scss" scoped></style>
