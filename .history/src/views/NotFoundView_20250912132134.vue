<template>
  <div class="not-found">
    <div class="content-card">
      <div class="content">
        <h1 class="error-code">404</h1>

        <div class="error-message">
          <span class="en">Page Not Found/Страница не найдена</span>
          <span class="ru">Страница не найдена</span>
        </div>

        <router-link to="/" class="home-button"> Вернуться на главную </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  height: 100vh;
  background: #eaeef6;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.content-card {
  width: 800px;
  height: 550px;
  background-color: #ffffff;
  border-radius: 35px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
}

.content {
  text-align: center;
  z-index: 1;
  padding: 2rem;
}
.error-code {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 190px;
  margin: 0;
  color: #565eef;
  text-shadow: 0 0 20px rgba(124, 167, 248, 0.911);
  animation: float 3s ease-in-out infinite;
  background-color: rgb(187, 241, 250);

  padding: 5px 100px 4px;
  border-radius: 100px;
}

.error-message {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  margin: 2rem 0;
  color: #000;
}
.en {
  display: block;
  font-size: 37px;
  letter-spacing: 2px;
}

.ru {
  display: block;
  font-size: 29px;
  opacity: 0.8;
}

.home-button {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  display: inline-block;
  padding: 5px 56px;
  background: #565eef;
  color: #ffffff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  margin-top: 32px;
}

.home-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px #565EEF(100, 255, 218, 0.3);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
