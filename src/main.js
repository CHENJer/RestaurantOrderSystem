// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Toast from 'muse-ui-toast';
import MuseMessage from 'muse-ui-message';
import 'muse-ui-message/dist/muse-ui-message.css';
import App from './App'
import router from './router'
import axios from 'axios';
import echarts from 'echarts'
import moment from 'moment'
import global from './common/util/commonInfo.vue'
import time from './filter/time.js'
import store from './store' //引入store
import Print from 'vue-print-nb'
import $ from 'jquery'
Vue.use(Print); //打印
Vue.prototype.COMMON = global  // 公共的地址

Vue.use(ElementUI);
Vue.use(MuseUI);

/*跨域请求头格式*/
axios.defaults.headers = {
  'Content-type': 'application/json'
}
/*/!*提交前可以被修改*!/
axios.defaults.transformRequest = [function (data) {
  var newData = "";
  for (var k in data) {
    newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  }
  return newData
}]*/
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

const ToastOption = {
  position: 'bottom-start', // 弹出的位置
  time: 2000, // 显示的时长
  closeIcon: 'close', // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: 'check_circle', // 成功信息图标
  infoIcon: 'info', // 信息信息图标
  warningIcon: 'priority_high', // 提醒信息图标
  errorIcon: 'warning' // 错误信息图标
}
Vue.use(Toast, ToastOption);
/*Vue.component(Message);
Vue.prototype.$message = Message*/

Vue.component(MuseMessage);
Vue.prototype.$MuseMessage = MuseMessage
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>',
  render: h => h(App),

})
