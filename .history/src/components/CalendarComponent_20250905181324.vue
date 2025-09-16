<template>
  <div class="pop-new-card__calendar calendar" :class="{ 'calendar--readonly': readonly }">
    <p class="calendar__ttl subttl">Даты</p>
    <div class="calendar__block">
      <div class="calendar__nav">
        <div class="calendar__month">{{ currentMonthFormatted }}</div>
        <div class="nav__actions">
          <div class="nav__action" data-action="prev" @click="prevMonth">
             
          </div>
          <div class="nav__action" data-action="next" @click="nextMonth">
            svg ...
          </div>
        </div>
      </div>
      <div class="calendar__content">
        <div class="calendar__days-names">
          <div v-for="day in dayNames" :key="day" class="calendar__day-name">
            {{ day }}
          </div>
        </div>
        <div class="calendar__cells">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="calendar__cell"
            :class="getCellClasses(day)"
            @click="selectDate(day)"
          >
            {{ day.date ? day.date.date() : '' }}
          </div>
        </div>
      </div>
      <div class="calendar__period">
        <p class="calendar__p date-end">
          <template v-if="selectedDate">
            Срок исполнения:
            <span class="date-control">
              {{ selectedDateFormatted }}
            </span>
          </template>
          <template v-else>
            {{ readonly ? 'Срок не установлен' : 'Выберите срок исполнения' }}
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { computed, ref, watch } from 'vue'

dayjs.locale('ru')

const props = defineProps({
  rawDate: String,
  initialDate: String,
  readonly: Boolean,
})

const emit = defineEmits(['date-selected'])

const currentMonth = ref(dayjs())
const selectedDate = ref(null)

// Инициализация даты
const initDate = () => {
  let date = null
  if (props.rawDate && dayjs(props.rawDate, 'YYYY-MM-DD', true).isValid()) {
    date = dayjs(props.rawDate, 'YYYY-MM-DD')
  } else if (props.initialDate && dayjs(props.initialDate, 'YYYY-MM-DD', true).isValid()) {
    date = dayjs(props.initialDate, 'YYYY-MM-DD')
  }
  selectedDate.value = date
  currentMonth.value = (date || dayjs()).startOf('month')
}

watch(() => props.rawDate, initDate, { immediate: true })

const calendarDays = computed(() => {
  const start = currentMonth.value.startOf('month').startOf('week')
  const end = currentMonth.value.endOf('month').endOf('week')
  const days = []
  let day = start

  while (day.isBefore(end) || day.isSame(end, 'day')) {
    days.push({
      date: day, // dayjs объект, копия
      isCurrentMonth: day.month() === currentMonth.value.month(),
      isWeekend: day.day() === 6 || day.day() === 0,
    })
    day = day.add(1, 'day')
  }

  // Клонируем dayjs, чтобы избежать мутаций
  return days.map((d) => ({
    ...d,
    date: d.date.clone(),
  }))
})

const dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

const currentMonthFormatted = computed(() =>
  currentMonth.value.format('MMMM YYYY').replace(/^./, (m) => m.toUpperCase()),
)

const prevMonth = () => {
  if (props.readonly) return
  currentMonth.value = currentMonth.value.subtract(1, 'month')
}

const nextMonth = () => {
  if (props.readonly) return
  currentMonth.value = currentMonth.value.add(1, 'month')
}

const getCellClasses = (day) => ({
  '_other-month': !day.isCurrentMonth,
  '_cell-day': day.isCurrentMonth,
  _selected: selectedDate.value?.isSame(day.date, 'day'),
  '_weekend-day': day.isWeekend,
})

const selectedDateFormatted = computed(() => {
  return selectedDate.value?.format('D MMMM YYYY') || ''
})

const selectDate = (day) => {
  if (props.readonly) return
  if (!day.isCurrentMonth) {
    currentMonth.value = day.date.startOf('month')
  }
  // Клонируем объект dayjs!
  selectedDate.value = day.date.clone()
  // Передаем наружу как строку в формате YYYY-MM-DD
  emit('date-selected', selectedDate.value.format('YYYY-MM-DD'))
}

watch(selectedDate, (newVal) => {
  if (newVal && newVal.month() !== currentMonth.value.month()) {
    currentMonth.value = newVal.startOf('month')
  }
})
</script>
<style lang="scss" scoped>
.calendar__cells {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar__cell {
  padding: 8px;
  text-align: center;
  cursor: pointer;

  transition: all 0.2s ease;
  border-radius: 4px;

  &._selected {
    background-color: #e3f2fd;
    font-weight: 600;
  }

  &._other-month {
    opacity: 0.4;
    pointer-events: none;
  }

  &._weekend-day {
    color: #ef5350;
  }
}

.calendar--readonly {
  .calendar__cell {
    pointer-events: none;
    cursor: default;

    &._selected {
      background-color: transparent;
    }
  }

  .nav__action {
    visibility: hidden;
  }
}

.date-end {
  color: #666;
  margin-top: 1rem;

  .date-control {
    color: #000;
    font-weight: 500;
  }
}

.nav__actions {
  display: flex;
  gap: 12px;
}

.nav__action {
  cursor: pointer;
  padding: 4px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
}

.calendar__month {
  font-weight: 500;
  margin-right: 15px;
}

@media (max-width: 768px) {
  .calendar__cell {
    padding: 6px;
    font-size: 14px;
  }

  .calendar__month {
    font-size: 15px;
  }
}
</style>
