import {login} from '@/api/login'

const state = {
    token:localStorage.getItem('token')?localStorage.getItem('token'):'',
    userName:'管理员',
    // roles:[],    //权限列表 后期要做角色权限管理再用
}

const getters = {
    token(state){
        return state.token
    }
}

const mutations = {
    setToken(state,val){
        state.token = val
        localStorage.setItem('token',val)
    },
    delToken(state){
        state.token = ''
        state.userName = ''
        localStorage.removeItem('token')
    },
    setName(state,val){
        state.userName = val
    }
}

const actions = {
    _login({commit},formData){
        return new Promise((resolve,reject)=>{
            login(formData)
                .then(res=>{
                    console.log('login then res',res)
                    // commit('setToken',)
                    resolve()
                },error=>{
                    reject(error)
                })
        })
    }
}

export default {
    namespcae:"true",
    state,
    getters,
    mutations,
    actions
}