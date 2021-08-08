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
    props: (route) => {
      return { code: route.params.code,
        'swatchClick': route.params.swatchClick === 'true'
      }
    }
  },
]

// const propCasterFn = (route) => {
//   console.log("CLICKED :: ", route.params.swatchClicked);
//   return true;
// }

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
