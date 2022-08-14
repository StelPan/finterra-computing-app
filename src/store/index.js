import Vue from 'vue'
import Vuex from 'vuex'

import * as dialogModule from './modules/dialogs';
import * as officeModule from './modules/office';
import * as regionModule from "./modules/regions";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    dialogModule,
    officeModule,
    regionModule,
  }
})
