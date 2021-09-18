import $axios from './axios'

export function fetchRecords(){
    const url="/host/filter?filter=&page=0_10&sort=-createTime"
    return $axios.get(url)
}

export function delHost(config){
    const url="/host/delete"
    return $axios.delete(url,config)
}

export function addHost(data){
    const url="/host/add"
    return $axios.post(url,data)
}