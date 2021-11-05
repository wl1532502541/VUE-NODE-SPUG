
import { getUsers } from "../../../api/account"
import {getRoles} from "../../../api/account"
export default {
    records: [],
    record: {},
    isFetching: false,
    formVisible: false,
    roles:[],

    username_search: "",
    is_active_search: "",

    fetchRecords () {
      this.isFetching = true
      return getUsers().then(res => {
        this.records = res
      }).finally(() => this.isFetching = false)
    },
    showForm (record = {}) {
      this.record = record
      this.formVisible = true
      if(this.roles.length==0){
        console.log("开始请求")
        getRoles().then(res=>{
          this.roles = res
        })
      }
    }
}
