import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import 'amfe-flexible'

import './styles/base.less'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
