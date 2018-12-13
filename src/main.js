import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js'
import VueResource from 'vue-resource'
// import vueDebounce from 'vue-debounce'
import store  from './store'
import VueJWT from 'vuejs-jwt'
// import bModal from 'bootstrap-vue/es/components/modal/modal'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(BootstrapVue);
 
// Vue.use(VModal)
// Vue.use(VModal, { dialog: true })
Vue.use(VueJWT)

// import 'es6-promise/auto';

Vue.use(VueResource)
// Vue.use(vueDebounce)
// Vue.use(vueDebounce, {
//   lock: false,
//   unlock:false
// })

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

