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
  {
    path: '/:matchAll(.*)/c/:code',
    name: 'Category',
    
    component: () => {
      return import('../views/Category.vue')
    },
    props: (route) => {
      return { code: route.params.code,
      }
    },
    // component: ProductView,
    beforeEnter: (route) => {
      console.log("ENTERING THE CATEGORY ROUTE :: ", route.params.code);
    },
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
