import $axios from './axios'


export function login(data){
    const url='/api/account/login'
    return $axios.post(url,data)
}

export function getHistories(){
    return $axios.get('/api/account/login/history')
}