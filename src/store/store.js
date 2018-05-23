import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import VuexPersistence from 'vuex-persist'
import _ from 'lodash'

import defaults from './components/defaults'
import theme from './components/theme'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex);

var moment = require('moment');

export default new Vuex.Store({
  state: {

    //DEFAULTS AND THEME ALSO INJECTED HERE THROUGH MODULES

    //GENERAL COURSE INFO
    info: _.cloneDeep(defaults.state.infoDefault),

    // Where the weeks are stored
    weeks: [],

    // UTILS
    loading: false,
    settingsFormVisible: false,
    prevPage: "/home",
    nextPage: "/weekly",
    imageServer: "https://s3.us-east-2.amazonaws.com/sipa-canvas/canvas-images/",
  },
  getters: {
    getStore: state => state,
    getInfo: state => state.info,
    loading: state => state.loading,
    getWeeks: state => state.weeks,

  },
  mutations: {
    updateInfo: (state, payload) => {
      state.info = payload
    },
    updateProp: (state, {prop, value}) => {
      state.info[prop] = value
    },
    updateUser: (state, {user, prop, value}) => {
      user[prop] = value
    },
    updateWeek: (state, {index, prop, value}) => {
      state.weeks[index][prop] = value
    },
    updateStore: (state, payload) => {
      state = payload
    },
    updateLoading: (state, payload) => {
      state.loading = payload
    },
    addWeek: (state, payload) => {
      state.weeks.push(payload)
    },
    sliceWeek: (state, num) => {
      state.weeks = state.weeks.slice(0,num)
    },
    updateWeeks: (state, payload) => {
      state.weeks = payload
    },
    refreshStore: (state) => {
      state = state
    },
    // updateWeek: (state, index, field, value) => {
    //   state.weeks[index][field] = value
    // },
  },
  modules: {
    defaults,
    theme
  },
  plugins: [createPersistedState()]
})
