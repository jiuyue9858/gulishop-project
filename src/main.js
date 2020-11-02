import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/api'  //直接引入api文件

// import {reqCategoryList} from '@/api'
// reqCategoryList()

Vue.config.productionTip = false

//全局注册组件
import TypeNav from '@/components/TypeNav'
Vue.component('TypeNav',TypeNav)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
