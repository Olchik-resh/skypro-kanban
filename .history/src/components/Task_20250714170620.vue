<template>
  <div class="cards__item">
    <div class="cards__card card">
      <div class="card__group">
        <div class="card__theme _orange">
          <p class="_orange">{{ task.theme }}</p>
        </div>
        <a :href="task.link" target="_self">
          <div class="card__btn">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </a>
      </div>
      <div class="card__content">
        <a :href="task.link" target="_blank">
          <h3 class="card__title">{{ task.title }}</h3>
        </a>
        <div class="card__date">
          <!-- Здесь можно добавить дату -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
}
</script>
