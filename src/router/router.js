import Vue from 'vue'
import Router from 'vue-router'

import login from '../views/login/'
import home from '../views/home/'
import tabbar from '../views/tabbar_layout/'
import area from '../zhishidian/area.vue'
import search from '../views/search/'
import list from '../views/list/'
import detail from '../views/detail/'
import mine from '../views/mine/'
import profile from '../views/profile/'


Vue.use(Router)

export default new Router({
  routes: [

    { path: "/login", component: login, name: "login" },
    { path: "/area", component: area, name: "area" },
    { path: "/search", component: search, name: "search" },
    { path: "/list/:key", component: list, name: "list" },
    { path: "/detail/:artId", component: detail, name: "detail" },
    { path: "/profile", component: profile, name: "profile" },
 

    {
      path: "",
      component: tabbar,

      children: [

        { path: "/home", component: home },
        { path: "/mine", component: mine },
        { path: "", redirect: '/home' },
      ]
    },
  ]
})
