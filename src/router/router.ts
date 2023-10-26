import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', component: () => import('../pages/IndexPage.vue')
    },
    {
      path: '/peoples', component: () => import('../pages/PeoplePage.vue')
    },
    {
      path: '/peoples/:id', component: () => import('../pages/PersonPage.vue')
    },
    {
      path: '/favorites', component: () => import('../pages/FavoritesPage.vue')
    },
  ]
})

export default router
