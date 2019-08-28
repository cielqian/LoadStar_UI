import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Setting from '@/components/Setting'
import Login from '@/components/Login'
import LinkPanel from '@/components/LinkPanel'
import Tag from '@/components/Tag'
import Folder from '@/components/Folder'
import Analysis from '@/components/Analysis'
import Passbook from '@/components/Passbook'
import Calendar from '@/components/Calendar'
import store from '../store';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const vueRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      alias: '/Home',
      meta: {
        requireLogin: true
      },
      children: [
        {
          path: '', component: LinkPanel, meta: {
            requireLogin: true
          }
        },
        {
          path: '/Tag', component: Tag, meta: {
            requireLogin: true
          }
        },
        {
          path: '/Folder', component: Folder, meta: {
            requireLogin: true
          }
        },
        {
          path: '/Analysis', component: Analysis, meta: {
            requireLogin: true
          }
        },
        {
          path: '/Calendar', component: Calendar, meta: {
            requireLogin: true
          }
        },
        {
          path: '/Setting',
          name: 'Setting',
          component: Setting,
          meta: {
            requireLogin: true
          }
        },
        {
          path: '/Passbook',
          name: 'Passbook',
          component: Passbook,
          meta: {
            requireLogin: true
          }
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})

vueRouter.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.requireLogin) {
    if (store.getters.hasLogined) {
      next()
    } else {
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
})

vueRouter.afterEach(() => {
  NProgress.done()
})

export default vueRouter
