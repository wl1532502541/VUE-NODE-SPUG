import $axios from './axios'


export function login(data){
    const url='/api/account/login'
    return $axios.post(url,data)
}
//////////////////////////////////////////////////
export function getHistories(){
    return $axios.get('/api/account/login/history')
}
///////////////////////////////////////////////////
export function getUsers(){
    return $axios.get('/api/account/user')
}

export function getUser(_id){
    return $axios.get(`/api/account/user/${_id}`)
}

export function addUser(data){
    return $axios.post('/api/account/user',data)
}

export function patchUser(_id,data){
    return $axios.patch('./api/account/user/'+_id,data)
}

export function deleteUser(_id){
    return $axios.delete('./api/account/user/'+_id)
}
//////////////////////////////////////////////////
export function getRoles(){
    return $axios.get('./api/account/role')
}

export function deleteRole(_id){
    return $axios.delete('./api/account/role/'+_id)
}
//////////////////////////////////////////////////
export function patchSelf(data){
    return $axios.patch('./api/account/self',data)
}
