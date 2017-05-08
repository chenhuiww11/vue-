import Vue from 'vue'
import App from './App'
import store from '../../store/index'//全局组件传值
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})

