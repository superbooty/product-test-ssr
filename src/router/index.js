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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/product/:code',
    name: 'Product',
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue'),
    // component: ProductView,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
