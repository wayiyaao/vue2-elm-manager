import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'
import store from './store'
import ElementUI from 'element-ui'
axios.defaults.withCredentials=true;
Vue.prototype.axios = axios
Vue.prototype.echarts = echarts
import 'element-ui/lib/theme-chalk/index.css'
// import getDay from './computend/getDay.js'
// Vue.prototype.getDay = getDay
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
