import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'

import { nanoid } from 'nanoid'

//routes
import Home from '../views/Home.vue'
import Coin from '../views/Coin.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Exchanges from '../views/Exchanges.vue'
import Watchlist from '../views/Watchlist.vue'
import Account from '../views/Account.vue'
import ErrorPage from '../views/Error.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    name: 'Error',
    component: ErrorPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {

  if(store.state.user.loggedIn !== true) {
    const errorMessage = {
      id: nanoid(),
      type: 'error',
      icon: 'alert-box',
      message: 'Please login.'
    }
    switch(true) {
      case to.name === 'Watchlist':
        next('/login')
        store.dispatch('addAlert', errorMessage)
      return
      case to.name === 'Account':
        next('/login')
        store.dispatch('addAlert', errorMessage)
      return
      case to.name === 'Portfolio':
        next('/login')
        store.dispatch('addAlert', errorMessage)
      return
    }
  }

  if(store.state.user.loggedIn === true) {
    switch(true) {
      case to.name === 'Login':
        next('/')
      return
      case to.name === 'signup':
        next('/')
      return
    }
  }

  next()
})


export default router
