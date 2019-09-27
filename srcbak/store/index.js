import Vue from 'vue'
import Vuex from 'vuex'

import { setUser } from '../utils/storage/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },

  // 方法，专门用来给state赋值
  mutations: {

    setUserInfo(state,user){
      // 也保存到本地存储
      setUser(user);

      // 保存到vuex自己的状态
      state.userInfo = user;
    }
  },
  actions: {

  }
})
