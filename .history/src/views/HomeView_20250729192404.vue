

<template>
  <main>
    <div class="wrapper">
      <!-- pop-up start-->

      <div class="pop-exit" id="popExit">
        <ExitModal />
      </div>

      <div class="pop-new-card" id="popNewCard">
        <NewCardModal />
      </div>

      <div class="pop-browse" id="popBrowse">
        <TaskModal />
      </div>

      <!-- pop-up end-->
      <BaseHeader />
      <div class="loader" v-if="loading">Данные загружаются...</div>
      <TaskDesk v-else :loading="loading" />
    </div>
  </main>
</template>
