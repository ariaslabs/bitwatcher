import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Coin from '../views/Coin.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Exchanges from '../views/Exchanges.vue'
import Watchlist from '../views/Watchlist.vue'
import Account from '../views/Account.vue'

Vue.use(VueRouter)

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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/coin/:coin_id',
    name: 'Coin',
    component: Coin
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/exchanges',
    name: 'Exchanges',
    component: Exchanges
  },
  {
    path: '/watchlist',
    name: 'Watchlist',
    component: Watchlist
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: "*",
    name: 'Error'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
