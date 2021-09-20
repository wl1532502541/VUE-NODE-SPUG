import $axios from './axios'

const preUrl='/api/rest/host'
// export function fetchRecords(){
export function getHosts(){
    // const url = `${preUrl}/filter?filter=&page=0_10&sort=-createTime`
    const url = `${preUrl}s`
    return $axios.get(url)
}

export function delHostById(id){
    const url = `${preUrl}`
    return $axios.delete(url,{params:{id:id}})
}

export function insertOrUpdateHost(data){
    const url = `${preUrl}`
    return $axios.post(url,data)
}
