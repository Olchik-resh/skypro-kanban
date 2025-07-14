<!-- <template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ columnTitle }}</p>
    </div>
    <div class="cards">
      <task v-for="task in tasks" :key="task.id" :task="task"></task>
    </div>
    <div class="column__actions">
      <button @click="addTask">Добавить задачу</button>
      <button @click="editColumn">Редактировать колонку</button>
    </div>
  </div>
</template>

<script>
import Task from './Task.vue';

export default {
  components: {
    Task
  },
  props: {
    columnTitle: {
      type: String,
      required: true
    },
    tasks: {
      type: Array,
      required: true
    }
  },
  methods: {
    addTask() {
      // Логика добавления новой задачи
      console.log('Добавить задачу');
    },
    editColumn() {
      // Логика редактирования колонки
      console.log('Редактировать колонку');
    }
  }
};
</script>

<style scoped>
.main__column {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

.column__title {
  font-weight: bold;
  margin-bottom: 10px;
}

.cards {
  display: flex;
  flex-direction: column;
}

.column__actions {
  margin-top: 10px;
}
</style>