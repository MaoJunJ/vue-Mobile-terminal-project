import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 导入自己写的登录插件
import plugin from './utils/loginPlugin/'
Vue.use(plugin)

import 'amfe-flexible'

import './styles/base.less'

// 导入本体（只有格式化时间的功能）
import dayjs from 'dayjs'
// 导入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 加载这个插件
dayjs.extend(relativeTime)
// 导入中文包
import 'dayjs/locale/zh-cn'
// 使用中文包
dayjs.locale('zh-cn')



// 注册全局过滤器
// 参数1：过滤器名字
// 参数2：过滤器的实现
Vue.filter('relvTime',(value) => {

   return dayjs(value).from( dayjs() );
})  

// 我想一个判断某一个时间距离现在时间有多久
// console.log(dayjs('2019-09-25').from(dayjs()));



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
