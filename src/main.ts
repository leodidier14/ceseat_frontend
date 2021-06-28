import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {cart_store} from './store/index'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

new Vue({
  router,
  store: cart_store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
