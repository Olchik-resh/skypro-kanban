<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo _show _light">
          <a href="" target="_self"><img src="/src/assets/images/logo.png" alt="logo" /></a>
        </div>
        <div class="header__logo _dark">
          <a href="" target="_self"><img src="/src/assets/images/logo_dark.png" alt="logo" /></a>
        </div>
        <nav class="header__nav">
          <button class="header__btn-main-new _hover01" id="btnMainNew">
            <RouterLink to="/new-card">Создать новую задачу</RouterLink>
          </button>
          <UserModal />
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import UserModal from './UserModal.vue'
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
}
.header__block {
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
}
.header__logo img {
  width: 85px;
}
.header__nav {
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header__btn-main-new {
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
}
.header__btn-main-new a {
  color: #ffffff;
}

.header__user::after {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 1px;
  border-left: 1.9px solid #565eef;
  border-bottom: 1.9px solid #565eef;
  transform: rotate(-45deg);
  margin: -6px 0 0 5px;
  padding: 0;
}
@media screen and (max-width: 495px) {
  .header {
    width: 100%;
    margin: 0 auto;
    background-color: #ffffff;
  }

  .header {
    width: 100%;
    margin: 0 auto;
    background-color: #ffffff;
  }
  .header__block {
    
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 10px;
    background-color: #ffffff;
    width: 100%;
    height: 70px;
  }
  .header__btn-main-new {
    width: 343px;
    z-index: 3;
    position: fixed;
    bottom: 30px;
    top: auto;
    align-items: center;
    height: 40px;
    border-radius: 4px;
  }

  .header__nav {
    max-width: 290px;
    padding: 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-between;
    margin-right: 24px;
  }
}
</style>
