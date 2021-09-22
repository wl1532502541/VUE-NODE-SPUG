import {  delHostById, getHosts } from "../../api/host"
import { message } from 'ant-design-vue'
export default {
  namespaced: true,
  state: {
    records: [],
    types: [],
    record: {},
    isFetching: false,
    formVisible: false,

    f_type: "",
    f_hostName: "",
    f_ip: ""
  },
  mutations: {
    //显示表格
    showForm(state, info = {}) {
      state.record = info
      console.log("info",info)
      state.formVisible = true
    },
    closeForm(state, callback) {
      state.formVisible = false
      if (callback) callback()
    },
    setRecords(state,data){
      state.records = data
    },
    resetState(state){
      stata.records= [],
      stata.types= [],
      stata.record= {},
      stata.isFetching= false,
      stata.formVisible= false,
      stata.f_type= "",
      stata.f_hostName= "",
      stata.f_ip= ""
    }
    
  },
  actions: {
    // 获取表格数据
    _getHosts({commit,state}){
      // return new Promise((resolve,reject)=>{
      //   state.isFetching = true
      //   fetchRecords().then((response)=>{
      //     commit('setRecords',[...response.items])
      //     let temp = state.records.map((item) => item.type)
      //     temp = new Set(temp)
      //     state.types = Array.from(temp)
      //     resolve()
      //   },error=>{
      //     reject(error)
      //   }).finally(()=>(state.isFetching = false))
      // })
        state.isFetching = true
        return getHosts().then((response)=>{
          commit('setRecords',response.data)
          console.log(response.data)
          let temp = state.records.map((item) => item.type)
          temp = new Set(temp)
          state.types = Array.from(temp)
        }).finally(()=>(state.isFetching = false))
    },
    // 删除主机
    _delHostById({dispatch},config){
      return delHostById(config).then(()=>{
        message.success("删除成功")
        dispatch('_fetchRecords')
      })

    }
  }

}
