import Vue from 'vue'
import './api/api'
import router from './router/routes'
import store from './store/store'//使用vuex。
import './tools/tools'
import 'mint-ui/lib/style.min.css'
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore)
const app = new Vue({
  router,
  store
}).$mount('#app')
window.HOST_NAME = "http://192.168.9.238";


