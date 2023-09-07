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
      path: '/products/:id',
      name: 'product_view',
      component: () => import('../views/Products/ProductDetails.vue')
    },
    {
      path: '/login',
      name: 'login_register',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/payment',
      name: 'payment_checkOut',
      component: () => import('../views/paymentCheckOut.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/UserProfle.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashBoard.vue')
    },
  ]
})

export default router
