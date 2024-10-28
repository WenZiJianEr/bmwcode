import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Details from '../components/details/index.vue'
import MyEexchange from '../components/MyEexchange/index.vue'
import Center from '../components/Center/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/details',
      component: Details
    },
    {
      path: '/myexchange',
      component: MyEexchange
    },
    {
      path: '/center',
      component: Center
    }
  ]
})

export default router
