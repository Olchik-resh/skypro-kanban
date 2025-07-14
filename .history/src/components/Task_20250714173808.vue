<template>
  <div class="cards__item">
    <div class="cards__card card" @click="openModal">
      <!-- ... -->
    </div>
  </div>
  <task-modal v-if="showModal" :task="task" @close="showModal = false"></task-modal>
</template>

<script>
import TaskMod from './TaskMod.vue'

export default {
  components: {
    TaskMod,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    openModal() {
      this.showModal = true
    },
  },
}
</script>
