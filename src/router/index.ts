import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import ProductsList from '../views/Products/ProductsList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products',
      name: 'products_list',
      component: () => import('../views/Products/ProductsList.vue')
    },
    {
      path: '/products/1',
      name: 'product_view1',
      component: () => import('../views/Products/Product1.vue')
    },
    {
      path: '/products/2',
      name: 'product_view2',
      component: () => import('../views/Products/Product2.vue')
    },
    {
      path: '/products/3',
      name: 'product_view3',
      component: () => import('../views/Products/Product3.vue')
    },
    {
      path: '/products/4',
      name: 'product_view4',
      component: () => import('../views/Products/Product4.vue')
    },
    {
      path: '/products/5',
      name: 'product_view5',
      component: () => import('../views/Products/Product5.vue')
    },
    {
      path: '/products/6',
      name: 'product_view6',
      component: () => import('../views/Products/Product6.vue')
    },
  ]
})

export default router
