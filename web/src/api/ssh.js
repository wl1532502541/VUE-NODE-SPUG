import $axios from './axios'

export function fetch(params){
    const url = "/host/get"
    return $axios.get(url,params)
}