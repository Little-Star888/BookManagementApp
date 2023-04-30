// 导入 Vue 模块
import Vue from 'vue'
// 导入 App 根组件
import App from './App.vue'
import './main.less'
import './plugins/vant'
import router from './router'
import store from './vuex/store'

Vue.config.productionTip = false
// 创建一个新的 Vue 实例
new Vue({
  store,
  router,
  // 渲染 App 根组件
  render: h => h(App),
  // 将vue实例挂载到 id 为 app 的元素上
}).$mount('#app')
