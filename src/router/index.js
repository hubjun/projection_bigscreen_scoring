/*
 * @Author: your name
 * @Date: 2020-11-04 18:33:14
 * @LastEditTime: 2020-11-10 15:37:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigscreen_pc\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import skateboard from '../views/skateboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/',
    name: 'skateboard',
    // component: skateboard
    component: () => import('../views/skateboard.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
