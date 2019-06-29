import Vue from 'vue'
import App from './App.vue'
import Chat from './../../../vendors/chat/index.js'
import vmodal from 'vue-js-modal'

Vue.use(vmodal , { dialog: true })
Vue.use(Chat, {})

// eslint-disable-next-line

export default class Dialog {

  constructor(selector) {

      const elems = document.querySelectorAll(selector);

      elems.forEach(el => {

          new Vue({
              el,
              created() {

              },
              methods: {

              },
              render: h => h(App)
          });
      });
    }
}
