<template>
  <button :class="['button', type ?? 'primary']" class="modal__btn-enter _hover01" id="btnEnter">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: String,
})
</script>


