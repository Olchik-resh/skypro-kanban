<template>
  <div class="not-found">
    <!-- Основная обертка для секции «Страница не найдена» -->
    <div class="content">
      <h1 class="error-code">404</h1>
      <!-- Крупный заголовок с кодом ошибки -->

      <div class="error-message">
        <span class="en">Page Not Found</span>
        <span class="ru">Страница не найдена</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.not-found {
   height: 100vh;
   background: #0a192f;
   display: flex;
   justify-content: center;
   align-items: center;
   overflow: hidden;
   position: relative;
}


.content {
   text-align: center;
   z-index: 1;
   padding: 2rem;
}
.error-code {
   font-size: 15rem;
   margin: 0;
   color: #64ffda;
   text-shadow: 0 0 20px rgba(100, 255, 218, 0.4);
   animation: float 3s ease-in-out infinite;
}

.error-message {
   margin: 2rem 0;
   color: #ccd6f6;
}