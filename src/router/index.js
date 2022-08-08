import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导出路由组件
import * as Cpms from './import'

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Cpms.Home
  },
  {
    path: '/takeout',
    component: Cpms.Takeout
  },
  {
    path: '/order',
    component: Cpms.Order
  },
  {
    path: '/search',
    component: Cpms.Search
  },
  {
    path: '/profile',
    component: Cpms.Profile
  }
]
const router = new VueRouter({
  mode: process.env.VUE_APP_ROUTER_MODE,
  strict: process.env.NODE_ENV !== 'production',
  routes
})

export default router
