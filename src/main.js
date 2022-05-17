import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import uView from "uview-ui";

Vue.use(uView);

// 引入请求封装，将app参数传递到配置中

const app = new Vue({
    ...App
})

require('./config/request.js')(app)

app.$mount()
