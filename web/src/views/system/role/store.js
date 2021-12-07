import { getRoles } from "../../../api/account"
import codes from './codes'
import lodash from 'lodash'
export default{ 
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
      this.records = res
    }).finally(() => this.isFetching = false)
  },
  showForm (record = {}) {
    this.record = record
    this.formVisible = true
  },
  showPagePerm(record){
    this.pagePermVisible = true
  },
  showDeployPerm(record){
    this.deployPermVisible = true
  },
  showHostPerm(record){
    this.hostPermVisible = true
  }
}