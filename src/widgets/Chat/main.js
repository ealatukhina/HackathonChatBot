import vuex from './../../vuex/'
import Vue from 'vue'
import Vuex from 'vuex'
import Chat from './../../../vendors/chat/index.js'
import vmodal from 'vue-js-modal'
import VueSession from 'vue-session'
import App from './App.vue'


Vue.use(Vuex);
Vue.use(vmodal , { dialog: true })
Vue.use(Chat, {})
Vue.use(VueSession)


const store = new Vuex.Store(vuex);

import { mapActions } from 'vuex';

// eslint-disable-next-line

export default class Dialog {

  constructor(selector) {

      const elems = document.querySelectorAll(selector);

      elems.forEach(el => {

          new Vue({
              el,
              store,   
              methods: {

             },
              render: h => h(App)
          });
      });
    }
}
