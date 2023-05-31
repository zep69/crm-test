import { createStore } from 'vuex'
import departs from './modules/departs'
const DEPARTS_URL = process.env.VUE_APP_BACK_HTTP+'crm/getDerapts'

export default createStore({
  state: {
    govno:555,
  },
  mutations: {
  },
  actions: {

  },
  modules: {
    departs
  }
})
