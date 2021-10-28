import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue'
import {message} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from "axios"
import VueAxios from "vue-axios"

// axios.defaults.baseURL='http://localhost:8081'

Vue.use(VueAxios, axios);
Vue.use(Antd);
// Vue.config.productionTip = false;
Vue.prototype.$message = message

export default new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
