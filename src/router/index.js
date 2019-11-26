import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Home from '../views/home/Home.vue'
import Signup from '@/views/Signup'
import Signin from '@/views/Signin'
import Books from '@/views/book/Books'
import Book from '@/views/book/Book'
import BookEdit from '@/views/book/BookEdit'
import Users from '@/views/user/Users'
import User from '@/views/user/User'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/home/About.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/books',
    component: Books,
    name: 'Books',
  },
  {
    path: '/books/:id',
    props: true,
    component: Book,
    name: 'Book'
  },
  {
    path: '/books/:id/edit',
    props: true,
    component: BookEdit,
    name: 'BookEdit'
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/users/:id',
    props: true,
    name: 'User',
    component: User,
  },
  {
    path: '*',
    redirect: "/"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
