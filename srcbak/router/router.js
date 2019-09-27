import Vue from 'vue'
import Router from 'vue-router'

import login from '../views/login/'
import home from '../views/home/'
import tabbar from '../views/tabbar_layout/'


Vue.use(Router)

export default new Router({
  routes: [

    { path: "/login", component: login, name: "login" },

    {
      path: "",

      component: tabbar,

      children: [

        { path: "/home", component: home },
        { path: "", redirect: '/home' },
      ]
    },
  ]
})
