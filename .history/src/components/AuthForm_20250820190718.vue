<template>
  <div>
    <div class="wrapper">
      <div class="container-signin">
        <div class="modal">
          <div class="modal__block">
            <div class="modal__ttl">
              <h2>{{ isSignUp ? 'Регистрация' : 'Вход' }}</h2>
            </div>
            <form class="modal__form-login" @submit.prevent="handleSubmit">
              <!-- Поле имени только для регистрации -->
              <BaseInput
                :class="{ error: errors.name }"
                v-show="isSignUp"
                name="name"
                id="formname"
                placeholder="Имя"
                v-model="formData.name"
                @input="clearError('name')"
                autocomplete="name"
                spellcheck="false"
              />
              <!-- Поле email -->
              <BaseInput
                :class="{ error: errors.login }"
                type="text"
                name="login"
                id="formlogin"
                placeholder="Эл.почта"
                v-model="formData.login"
                @input="clearError('login')"
                autocomplete="email"
                spellcheck="false"
              />
              <!-- Поле пароля -->
              <BaseInput
                :class="{ error: errors.password }"
                type="password"
                name="password"
                id="formpassword"
                placeholder="Пароль"
                v-model="formData.password"
                @input="clearError('password')"
                autocomplete="current-password"
                spellcheck="false"
              />
              <p class="error-message" v-if="error">{{ error }}</p>
              <!-- Кнопка отправки -->
              <BaseButton
                type="secondary"
                :fullWidth="true"
                :disabled="isFormInvalid"
                @click="handleSubmit"
              >
                {{ isSignUp ? 'Зарегистрироваться' : 'Войти' }}
              </BaseButton>

              <!-- Ссылки для переключения между формами -->
              <div v-show="!isSignUp" class="modal__form-group">
                <p>Нужно зарегистрироваться?</p>
                <RouterLink to="/sign-up">Регистрируйтесь здесь</RouterLink>
              </div>
              <div v-show="isSignUp" class="modal__form-group">
                <p>Уже есть аккаунт? <RouterLink to="/sign-in">Войдите здесь</RouterLink></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'
import { signIn, signUp } from '@/servises/auth'

const auth = inject('auth') // Извлекаем весь объект auth
const userInfo = auth?.user // Добавляем проверку на существование
const router = useRouter()
const isFormInvalid = ref(false)

const props = defineProps({
  isSignUp: Boolean,
})

const formData = ref({
  name: '',
  login: '',
  password: '',
})

const errors = ref({
  name: false,
  login: false,
  password: false,
})

const error = ref('')

function validateName(name) {
  if (!name.trim()) {
    return false
  }
  return true
}

function validateLogin(login) {
  if (!login.trim()) {
    return false
  }
  return true
}

function validatePassword(password) {
  if (!password.trim()) {
    return false
  }
  return true
}

function clearError(fieldName) {
  errors.value[fieldName] = false
}

async function handleSubmit(event) {
  event.preventDefault()
  console.log('Обработчик клика вызван')
  console.log('Проверка формы...')

  const isNameValid = validateName(formData.value.name)
  const isLoginValid = validateLogin(formData.value.login)
  const isPasswordValid = validatePassword(formData.value.password)

  let isValid = true

  if (!isNameValid || !isLoginValid || !isPasswordValid) {
    if (!isNameValid) {
      errors.value.name = true
      isValid = false
    }
    if (!isLoginValid) {
      errors.value.login = true
      isValid = false
    }
    if (!isPasswordValid) {
      errors.value.password = true
      isValid = false
    }
  } else {
    // Сброс переменной error при успешной валидации
    error.value = ''
  }

  if (!isValid) {
    if (props.isSignUp) {
      error.value =
        'Введённые вами данные некорректны. Чтобы завершить регистрацию, заполните все поля в форме.'
    } else {
      error.value =
        'Введённые вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа.'
    }
    return
  }

  try {
    if (isValid) {
      console.log('Попытка авторизации с данными:', formData.value)

      const data = props.isSignUp
        ? await signUp(formData.value)
        : await signIn({ login: formData.value.login, password: formData.value.password })

      console.log('Полученный ответ:', data)

      if (data) {
        auth.setUserInfo(data) // Используем auth.setUserInfo
        router.push('/')
      }
    }
  } catch (err) {
    error.value = err.message
    console.error('Ошибка авторизации:', err)
  }
}

// Добавляем watch с проверкой на существование
if (userInfo) {
  watch(
    userInfo,
    (newVal) => {
      console.log('Пользователь изменился:', newVal)
    },
    { immediate: true },
  )
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
}

a,
a:visited {
  text-decoration: none;
  cursor: pointer;
}

button,
._btn {
  cursor: pointer;
}

ul li {
  list-style: none;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: 'Roboto', sans-serif;
}

div,
button,
a {
  font-family: 'Roboto', sans-serif;
}

.wrapper {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #eaeef6;
}

.container-signin {
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
}

._hover01:hover {
  background-color: #33399b;
}

.modal {
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
}
.modal__ttl h2 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin-bottom: 20px;
}
.modal__form-login {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: stretch;
  gap: 7px;
}

.modal__input {
  width: 100%;
  min-width: 100%;
  border-radius: 8px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  outline: none;
  padding: 10px 8px;
}
.modal__input::-moz-placeholder {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #94a6be;
}
.modal__input::placeholder {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #94a6be;
}
.modal__btn-enter {
  width: 100%;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  margin-top: 13px;
  margin-bottom: 20px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
}
.modal__btn-enter:disabled {
  background-color: #94a6be;
  cursor: not-allowed;
}
.modal__btn-enter a {
  width: 100%;
  height: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal__form-group {
  text-align: center;
}
.modal__form-group p,
.modal__form-group a {
  color: rgba(148, 166, 190, 0.4);
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
}
.modal__form-group a {
  text-decoration: underline;
}
.error {
  border: 0.7px solid red;
  padding: 0;
  margin: 0;
  border-radius: 8px;
}
.error-message 

.BaseInput {
  &::after {
    content: attr(error-message);
    display: block;
    margin-top: 5px;
    color: red;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &.error::after {
    opacity: 1;
  }
  &.error {
    border-color: red;
    &:focus {
      border-color: darkred;
    }
  }
}

.button-enter.error {
  background: #94a6be; /* Цвет фона кнопки при ошибке */
}

@media screen and (max-width: 375px) {
  .modal {
    background-color: #ffffff;
  }
  .modal__block {
    max-width: 368px;
    width: 100%;
    padding: 0 16px;
    border-radius: none;
    border: none;
    box-shadow: none;
  }
  .modal__btn-enter {
    height: 40px;
  }
}
</style>
