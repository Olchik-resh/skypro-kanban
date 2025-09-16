import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import NotFoundView from '/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/new-card',
          component: () => import('../views/NewCardView.vue'),
        },

        {
          path: '/browse-card/:id',
          component: () => import('../views/BrowseView.vue'),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/sign-in',
      component: SignInView,
    },
    {
      path: '/sign-up',
      component: SignUpView,
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('userInfo')

  if (to.meta.requiresAuth && !token) {
    next('/sign-in')
  } else {
    next()
  }
})

export default router
