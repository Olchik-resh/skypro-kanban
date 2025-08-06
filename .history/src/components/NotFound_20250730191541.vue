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
   <svg class="waves" viewBox="0 0 1440 320">
<path fill="#0099ff" fill-opacity="1" 
   d="M0,128L48,117.3C96,107,192,85,288,106.7C384,128,480,192,576,192C672,192,
   768,128,864,122.7C960,117,1056,171,1152,170.7C1248,171,1344,117,1392,90.7L1440, 
   64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768, 
   320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
</path>
</svg>

<router-link to="/" class="home-button">
   Вернуться на главную
</router-link>
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