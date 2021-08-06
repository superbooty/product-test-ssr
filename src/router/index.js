import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import ProductView from '../views/Product.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:code',
    name: 'Product',
    component: () => {
      return import('../views/Product.vue')
    },
    // component: ProductView,
    props: true
  },
]



const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
