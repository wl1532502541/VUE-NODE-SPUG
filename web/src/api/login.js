import $axios from './axios'

export function login(data){
    const url='/login'
    return $axios.post(url,data)
}