// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Core App Imports
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

// Outside frameworks/components
import VueResource from 'vue-resource'
import Snotify from 'vue-snotify'
import 'vue-snotify/styles/material.css'
import VueTippy from 'vue-tippy'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css' // Use this OR theme chalk in index.html
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(VueResource);
Vue.use(Snotify);
Vue.use(ElementUI, { locale })
Vue.use(VueTippy)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
