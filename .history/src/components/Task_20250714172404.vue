<template>
  <article class="wrapper">
    <h2 class="word-name">Name</h2>
    <div>до 31 декабря</div>
  </article>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 270px;
  height: 159px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #101010;
  border-radius: 24px;
}

.word-name {
  font-weight: 500;
  font-size: 24px;
}
.open {
  color: #ffffff;
}
.new {
  background: #d3b3f5;
}

.in-progress {
  background: #f5a623;
}

.learned {
  background: #b4ec51;
}
</style>
