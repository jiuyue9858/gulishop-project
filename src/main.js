import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/api'  //直接引入api文件
import '@/mock/mockServer'//引入mock接口文件，引入完成，本地就已经模拟好接口了
// import {reqCategoryList} from '@/api'
// reqCategoryList()

import "swiper/css/swiper.css";

Vue.config.productionTip = false

//全局注册组件
import TypeNav from '@/components/TypeNav'
import SliderLoop from '@/components/SliderLoop'
import Pagination from '@/components/Pagination'
Vue.component('TypeNav',TypeNav)
Vue.component('SliderLoop',SliderLoop)
Vue.component('Pagination',Pagination)

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
