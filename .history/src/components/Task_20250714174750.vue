<template>
  <div class="task" @click="openModal">
    <div class="task__header">
      <h3 class="task__title">{{ task.title }}</h3>
      <div class="task__status">{{ task.status }}</div>
    </div>
    <div class="task__description">{{ task.description }}</div>
    <div class="task__buttons">
      <button @click="editTask">Редактировать</button>
      <button @click="deleteTask">Удалить</button>
    </div>
    <task-modal v-if="showModal" :task="task" @close="showModal = false"></task-modal>
  </div>
</template>

<script>
import TaskModal from './TaskModal.vue';

export default {
  components: {
    TaskModal
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    editTask() {
      // Логика редактирования задачи
      console.log('Редактировать задачу');
    },
    deleteTask() {
      // Логика удаления задачи
      console.log('Удалить задачу');
    },
    openModal() {
      this.showModal = true;
    }
  }
};
</script>

