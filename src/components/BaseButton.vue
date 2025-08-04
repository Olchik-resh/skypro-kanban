<!-- <template>
  <button :class="['button', type ?? 'primary']" class="modal__btn-enter _hover01">
    <RouterLink to="/" :onClick="handleSignIn">
      <slot></slot>
    </RouterLink>
  </button>
</template>

<script setup>
import router from '@/router'
async function handleSignIn(e) {
  e.preventDefault()
  localStorage.setItem('userInfo', 'true')
  router.push('/')
}
defineProps({
  type: String,
})
</script> -->
