import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Setting from '@/components/Setting'
import Login from '@/components/Login'
import LinkPanel from '@/components/LinkPanel'
import store from '../store';

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
      children:[
        { path: '', component: LinkPanel },
        {
          path: '/Setting',
          name: 'Setting',
          component: Setting,
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

export default vueRouter
