import Vue from 'vue'
import Vuex from 'vuex'
import { setUser } from '@/utils/storage/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:null
  },
  mutations: {

    setUserInfo(state,val){

      // 保存到本地存储
      setUser(val)
      state.userInfo = val;
    }
  },
  actions: {

  }
})
