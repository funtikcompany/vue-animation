import { createStore } from 'vuex'

export default createStore({
  state: {
    open:false
  },
  getters: {
    open:(state) => state.open,
  },
  mutations: {
    OPEN_MENU(state,status){
      state.open=status;
    }
  },
  actions: {
   closeOrOpen({commit},status){
      commit('OPEN_MENU',status);
    }
  },
  modules: {
  }
})
