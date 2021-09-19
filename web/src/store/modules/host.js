import { delHost, fetchRecords } from "../../api/host"
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
      state.formVisible = true
    },
    closeForm(state, callback) {
      state.formVisible = false
      if (callback) callback()
    },
    setRecords(state,data){
      state.records = data
    },
    
  },
  actions: {
    // 获取表格数据
    _fetchRecords({commit,state}){
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
        return fetchRecords().then((response)=>{
          // console.log(response)
          commit('setRecords',response.data)
          let temp = state.records.map((item) => item.type)
          temp = new Set(temp)
          state.types = Array.from(temp)
        }).finally(()=>(state.isFetching = false))
    },
    // 删除主机
    _delHost({dispatch},config){
      return delHost(config).then(()=>{
        message.success("删除成功")
        dispatch('_fetchRecords')
      })

    }
  }

}
