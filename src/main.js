// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import '../theme/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import moment from "moment"
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'

import * as utils from '@/utils/common'

Vue.prototype.$utils = utils
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$moment = moment;
moment.locale('zh-cn');
 
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
