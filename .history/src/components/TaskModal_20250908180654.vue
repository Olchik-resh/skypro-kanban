<template>
  <div v-if="isModalOpen" class="pop-browse__container">
    <div class="pop-browse__block">
      <div class="pop-browse__content">
        
        <div class="pop-browse__top-block">
          <h3 class="pop-browse__ttl">
            <template v-if="isEditing">
              <input
                type="text"
                v-model="editedTask.title"
                class="edit-title"
                @input="handleTitleChange($event.target.value)"
                placeholder="Название задачи"
              />
            </template>
            <template v-else>
              {{ task.title }}
            </template>
          </h3>
          <div :class="topicClass">
            <p>{{ task.topic }}</p>
          </div>
        </div>
       
        <div v-if="isEditing && titleError" class="error-message">{{ titleError }}</div>

        <div class="pop-browse__status status">
          <p class="status__p subttl">Статус</p>
          <div class="status__themes">
            <template v-if="isEditing">
              <div
                v-for="status in statusOptions"
                :key="status"
                class="status__theme"
                :class="{
                  _blue: editedTask.status === status,
                  _selected: editedTask.status === status,
                  'bg-94a6be': editedTask.status === status,
                  _editable: isEditing,
                }"
                @click="handleStatusChange(status)"
              >
                <p>{{ status }}</p>
              </div>
            </template>
            <template v-else>
              <div
                v-for="status in statusOptions"
                :key="status"
                class="status__theme"
                :class="statusClass(status)"
              >
                <p :class="statusTextClass(status)">{{ status }}</p>
              </div>
            </template>
          </div>
        </div>
        
        <div v-if="isEditing && statusError" class="error-message">{{ statusError }}</div>

        
        <div class="pop-browse__wrap">
          <form class="pop-browse__form form-browse">
            <div class="form-browse__block">
              <label class="subttl">Описание задачи</label>
              <textarea
                class="form-browse__area"
                :readonly="!isEditing"
                :value="isEditing ? editedTask.description : task.description"
                @input="isEditing && (editedTask.description = $event.target.value)"
                placeholder="Описание задачи..."
              ></textarea>
            </div>
          </form>

        
          <div>
            <CalendarComponent
              :raw-date="task.date"
              :initial-date="isEditing ? null : task.date"
              :readonly="!isEditing"
              @date-selected="handleDateSelect"
            />
         
            <div v-if="isEditing && dateError" class="error-message">{{ dateError }}</div>
          </div>
        </div>
      </div>

     
      <div class="pop-browse__btn-edit">
        <div class="btn-group">
          <button v-if="!isEditing" class="btn-edit _btn-bor _hover03" @click="startEditing">
            Редактировать задачу
          </button>
          <template v-else>
            <button
              class="btn-save _btn-bg _hover01"
              @click="saveChanges"
              :disabled="isFormInvalid"
            >
              {{ isSubmitting ? 'Сохранение...' : 'Сохранить' }}
            </button>
            <button class="btn-cancel _btn-bg _hover01" @click="cancelEditing">Отменить</button>
          </template>

         
          <div v-if="hasTriedSubmit && errorMessage" class="error-message">
            <p>{{ errorMessage }}</p>
          </div>

          <button
            class="btn-browse__delete _btn-bor _hover03"
            @click="handleDelete"
            :disabled="isDeleting"
          >
            {{ isDeleting ? 'Удаление...' : 'Удалить задачу' }}
          </button>
        </div>

        <button class="btn-edit__close _btn-bg _hover01" @click="closeModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import { deleteTask, editTask } from '../servises/api'
import router from '../router'
import CalendarComponent from './CalendarComponent.vue'
import dayjs from 'dayjs'

const route = useRoute()
const { tasks } = inject('tasksData')
const { userInfo } = inject('auth')

const isSubmitting = ref(false)
const isModalOpen = ref(true)
const isEditing = ref(false)
const isDeleting = ref(false)
const hasTriedSubmit = ref(false) 

const titleError = ref('')
const dateError = ref('')
const statusError = ref('')
const errorMessage = ref('')

const originalTask = ref({})
const editedTask = ref({
  title: '',
  description: '',
  status: '',
  topic: '',
  date: null,
  _id: '',
})

// Загрузка задачи
const task = computed(() => {
  const foundTask = tasks.value.find((t) => t._id === route.params.id) || {
    title: '',
    description: '',
    status: '',
    topic: '',
    date: new Date().toISOString(),
    _id: '',
  }
  return foundTask
})

// Начало редактирования
const startEditing = () => {
  if (!task.value?._id) {
    errorMessage.value = 'Задача не найдена'
    return
  }
  originalTask.value = { ...task.value }
  editedTask.value = {
    ...task.value,
    date: task.value.date ? dayjs(task.value.date).toDate() : null,
    _id: task.value._id,
  }
  isEditing.value = true
  titleError.value = ''
  dateError.value = ''
  statusError.value = ''
  errorMessage.value = ''
}

// Обработчики изменений
const handleTitleChange = (title) => {
  editedTask.value.title = title
  if (hasTriedSubmit.value || isEditing.value) {
    titleError.value = title.trim().length < 3 ? 'Минимум 3 символа' : ''
  }
}

const handleDateSelect = (date) => {
  editedTask.value.date = date

  if (!date) {
    dateError.value = 'Укажите дату'
  } else if (dayjs(date).isBefore(dayjs().startOf('day'))) {
    dateError.value = 'Дата не может быть в прошлом'
  } else {
    dateError.value = ''
    console.log('Дата успешно выбрана:', dayjs(date).format('YYYY-MM-DD'))
  }

  console.log('dateError:', dateError.value, 'date:', dayjs(date).format('YYYY-MM-DD'))
}

const handleStatusChange = (status) => {
  editedTask.value.status = status
  if (hasTriedSubmit.value || isEditing.value) {
    statusError.value = !status ? 'Выберите статус' : ''
  }
}

// Валидация формы
const validateForm = () => {
  console.log('editedTask.value.date:', editedTask.value.date) // Вывод в консоль
  let valid = true

  if (!editedTask.value.title || editedTask.value.title.trim().length < 3) {
    titleError.value = 'Минимум 3 символа'
    valid = false
  } else {
    titleError.value = ''
  }

  if (!editedTask.value.status) {
    statusError.value = 'Выберите статус'
    valid = false
  } else {
    statusError.value = ''
  }
  console.log('editedTask.value.date перед преобразованием:', editedTask.value.date)
  const pickedDate = dayjs(editedTask.value.date).startOf('day')
  console.log('pickedDate после преобразования:', pickedDate.format('YYYY-MM-DD'))
  const today = dayjs().startOf('day')
  console.log('pickedDate:', pickedDate.format('YYYY-MM-DD'))
  console.log('today:', today.format('YYYY-MM-DD'))

  if (!editedTask.value.date) {
    dateError.value = 'Укажите дату'
    valid = false
  } else if (pickedDate.isBefore(today)) {
    dateError.value = 'Дата не может быть в прошлом'
    valid = false
  } else {
    dateError.value = ''
  }

  return valid
}

const isFormInvalid = computed(
  () => !!titleError.value || !!dateError.value || !!statusError.value || isSubmitting.value,
)

// Сохранение изменений
const saveChanges = async () => {
  hasTriedSubmit.value = true
  if (!validateForm()) {
    return
  }
  errorMessage.value = ''
  try {
    isSubmitting.value = true
    const taskData = {
      title: editedTask.value.title.trim(),
      status: editedTask.value.status,
      topic: editedTask.value.topic,
      description: editedTask.value.description,
      date: dayjs(editedTask.value.date).toISOString(),
    }

    const updatedTasks = await editTask({
      token: userInfo.value.token,
      id: editedTask.value._id,
      task: taskData,
    })
    console.log(taskData)
    tasks.value = updatedTasks
    closeModal()
  } catch (error) {
    errorMessage.value = error.message
    if (error.message.includes('авторизации')) {
      router.push('/login')
    }
  } finally {
    isSubmitting.value = false
  }
}

// Закрытие и отмена
const closeModal = () => {
  isModalOpen.value = false
  router.push('/')
}

const cancelEditing = () => {
  Object.assign(editedTask.value, originalTask.value)
  isEditing.value = false
  errorMessage.value = ''
  titleError.value = ''
  dateError.value = ''
  statusError.value = ''
  hasTriedSubmit.value = false
}

// Удаление задачи
const handleDelete = async () => {
  try {
    if (!confirm('Вы точно хотите удалить задачу?')) return
    isDeleting.value = true
    errorMessage.value = ''
    await deleteTask({
      token: userInfo.value.token,
      id: route.params.id,
    })
    const taskIndex = tasks.value.findIndex((t) => t._id === route.params.id)
    if (taskIndex !== -1) {
      tasks.value.splice(taskIndex, 1)
    }
    closeModal()
  } catch (error) {
    errorMessage.value = error.response?.data?.error || error.message || 'Ошибка удаления'
    if (error.response?.status === 401) {
      router.push('/login')
    }
  } finally {
    isDeleting.value = false
  }
}

// Статусы и стили
const statusOptions = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']
const topicClass = computed(() => TopicColor(task.value.topic))

function TopicColor(topic) {
  if (topic === 'Web Design') return '_orange'
  if (topic === 'Research') return '_green'
  if (topic === 'Copywriting') return '_purple'
  return '_gray'
}

function statusClass(status) {
  return task.value.status === status ? '_gray' : '_hide'
}

function statusTextClass(status) {
  return task.value.status === status ? '_gray' : ''
}
</script>

<style lang="scss" scoped>
.pop-browse__container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 7;
}
.pop-browse__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
}
.pop-browse__content {
  display: block;
  text-align: left;
}
.pop-browse__content .categories__theme {
  opacity: 1;
}
.pop-browse__content .theme-down {
  display: none;
  margin-bottom: 20px;
}
.pop-browse__content .theme-top {
  display: block;
}
.pop-browse__top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.pop-browse__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}
.pop-browse__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}
.pop-browse__btn-browse,
.pop-browse__btn-edit {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__btn-browse button,
.pop-browse__btn-edit button {
  height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
}
.pop-browse__btn-browse .btn-group button,
.pop-browse__btn-edit .btn-group button {
  margin-right: 8px;
}
.status__theme {
  &._selected {
    background-color: #94a6be;
    color: #fff;
    p {
      color: #fff;
    }
  }

  &:hover {
    background-color: rgba(94, 166, 190, 0.8);
  }
}
.loader-small {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid #fff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;
}
</style>
