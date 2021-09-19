import $axios from './axios'


export function login(data){
    const url='/api/login'
    return $axios.post(url,data)
}