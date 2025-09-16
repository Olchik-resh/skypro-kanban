<template>
  <div class="pop-new-card__calendar calendar" :class="{ 'calendar--readonly': readonly }">
    <p class="calendar__ttl subttl">Даты</p>
    <div class="calendar__block">
      <div class="calendar__nav">
        <div class="calendar__month">{{ currentMonthFormatted }}</div>
        <div class="nav__actions">
          <div class="nav__action" data-action="prev" @click="prevMonth">
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
              <path
                d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
              />
            </svg>
          </div>
          <div class="nav__action" data-action="next" @click="nextMonth">
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
              <path
                d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"
              />
            </svg>
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
      date: day,
      isCurrentMonth: day.month() === currentMonth.value.month(),
      isWeekend: day.day() === 6 || day.day() === 0,
    })
    day = day.add(1, 'day')
  }

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

  selectedDate.value = day.date.clone()

  emit('date-selected', selectedDate.value.format('YYYY-MM-DD'))
}

watch(selectedDate, (newVal) => {
  if (newVal && newVal.month() !== currentMonth.value.month()) {
    currentMonth.value = newVal.startOf('month')
  }
})
</script>
<style lang="scss" scoped>
.calendar {
  width: 182px;
  margin-bottom: 20px;
}
.calendar__ttl {
  margin-bottom: 14px;
  padding: 0 7px;
}
.calendar__p {
  color: #94a6be;
  font-size: 10px;
  line-height: 1;
}
.calendar__p span {
  color: #000000;
}
.calendar__block {
  display: block;
}
.calendar__month {
  color: #94a6be;
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
}
.calendar__content {
  margin-bottom: 12px;
}
.calendar__days-names {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
}
.calendar__day-name {
  color: #94a6be;
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
}
.calendar__cells {
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;
}
.calendar__cell {
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: #94a6be;
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: pointer;
}
.calendar__nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;
}
.calendar__period {
  padding: 0 7px;
}
.nav__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__action {
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav__action svg {
  fill: #94a6be;
}

._other-month {
  opacity: 0;
}

._cell-day:hover {
  color: #94a6be;
  background-color: #eaeef6;
}

._active-day {
  background-color: #94a6be;
  color: #ffffff;
}

._current {
  font-weight: 700;
}
.calendar__cell._selected {
  background-color: #94a6be;
  border-radius: 50px;
  color: #ffffff;
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

@media only screen and (max-width: 375px) {
  .calendar__block {
    width: 344px;
    height: 385.51px;
  }
}
</style>
