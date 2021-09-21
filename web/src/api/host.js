import $axios from './axios'

const preUrl='/api/rest/host'
// export function fetchRecords(){
export function getHosts(){
    // const url = `${preUrl}/filter?filter=&page=0_10&sort=-createTime`
    const url = `${preUrl}s`
    return $axios.get(url)
}

export function delHostById(_id){
    const url = `${preUrl}/${_id}`
    return $axios.delete(url)
}

export function insertOrUpdateHost(_id,data){
    const url = `${preUrl}`
    if(_id){
        console.log("update host, _id:", _id)
        return $axios.put(url+'/'+_id,data)
    }else{
        console.log("put host, data:", data)
        return $axios.post(url,data)
    }
}
