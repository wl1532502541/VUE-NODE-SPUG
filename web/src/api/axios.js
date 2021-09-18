import axios from 'axios'
import store from '@/store'
import router from '@/router'
import Vue from 'vue'
import { message } from 'ant-design-vue'

const $axios = axios.create({
    // 超时时间
    timeout:30000,
    baseURL:process.env.VUE_APP_BASE_API
})
Vue.prototype.$http = axios // 并发请求

// 请求拦截器
$axios.interceptors.request.use(
    config => {
        const token = store.getters.token
        if(token){
            config.headers.Authorization = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
$axios.interceptors.response.use(
    response => {
        const code = response.status
        if((code>=200 && code<300) || code ===304 ){
            return Promise.resolve(response.data)
        }else{
            return Promise.reject(response.statusText)
        }
    },
    error => {
        if(error.response){
            switch(error.response.status){
                case 401:
                    // 会话过期，要重新登陆
                    message.error('会话过期，重新登陆')
                    store.commit('delToken')
                    router.replace({
                        path:'/login'
                    })
                    break;
                case 404:
                    message.error('网络请求不存在')
                    break;
                default:
                    message.error(error.response.data.status)
            }
        }else{
            // 请求超时或网络有问题
            if(error.message.includes('timeout')){
                message.error('请求超时')
            }else{
                message.error('请求失败')
            }
        }
        return Promise.reject(error)
    }
    
)

export default $axios
// export default {
//     get(url,params){
//         return $axios({
//             method:'get',
//             url,
//             params
//         })
//     },
//     post(url,data){
//         return $axios({
//             method:'post',
//             url,
//             data:JSON.stringify(data),
            
//         })
//     },
//     delete(url,config){
//         return $axios({
//             method:'delete',
//             url,
//             config:JSON.stringify(config)
//         })
//     }
// }