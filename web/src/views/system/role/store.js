import { getRoles } from "../../../api/account"
import codes from './codes'
import lodash from 'lodash'
const store = { 
  allPerms: {},
  initPerms: {},
  records: [],
  record: {},
  permissions: lodash.cloneDeep(codes),
  isFetching: false,
  formVisible: false,
  pagePermVisible:false,
  deployPermVisible:false,
  hostPermVisible:false,

  name_search:"",


  fetchRecords () {
    this.isFetching = true
    return getRoles().then(res => {
      console.log('fetchroles',res)
      this.records = res
    }).finally(() => this.isFetching = false)
  },
  initPermissions(){
    for(let mod of codes){
      this.initPerms[mod.key]={}
      for(let page of mod.pages){
        this.initPerms[mod.key][page.key] = [];
        this.allPerms[`${mod.key}.${page.key}`] = page.perms.map(x => x.key)
      }
    }
  },
  showForm (record = {}) {
    this.record = record
    this.formVisible = true
  },
  showPagePerm(record){
    this.record = record
    this.pagePermVisible = true
    this.permissions = lodash.merge({}, this.initPerms, record.page_perms)
  },
  showDeployPerm(record){
    this.record = record
    this.deployPermVisible = true
  },
  showHostPerm(record){
    this.record = record
    this.hostPermVisible = true
  }
}
store.initPermissions()
export default store