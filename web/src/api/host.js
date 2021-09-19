import $axios from './axios'

const preUrl='/api/rest/host'
export function fetchRecords(){
    // const url = `${preUrl}/filter?filter=&page=0_10&sort=-createTime`
    const url = `${preUrl}`
    return $axios.get(url)
}

export function delHost(config){
    const url = `${preUrl}/delete`
    return $axios.delete(url,config)
}

export function addHost(data){
    const url = `${preUrl}/add`
    return $axios.post(url,data)
}