import { getRoles } from "../../../api/account"
export default{ 
  records: [],
  record: {},
  isFetching: false,
  formVisible: false,

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
  }
}