import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from "@/api/getData";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminInfo: {
      avatar: 'default.jpg'
    },
  },
  mutations: {
    saveAdminInfo(state, adminInfo){
      state.adminInfo = adminInfo;
    }
  },
  actions: {
    async getAdminData({commit}){
      try{
        const res = await getAdminInfo()
        console.log(res)
        if (res.status == 1) {
          commit('saveAdminInfo', res.data);
        }else{
          throw new Error(res.type)
        }
      }catch(err){
        // console.log(err.message)
      }
    }
  },
  modules: {
  }
})
