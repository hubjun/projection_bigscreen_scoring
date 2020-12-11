/*
 * @Author: your name
 * @Date: 2020-11-04 18:27:41
 * @LastEditTime: 2020-11-10 15:12:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigscreen_pc\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui';
import './element-variables.scss';
// import http from './config/http';

// Vue.prototype.http = http 
Vue.use(Element);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
