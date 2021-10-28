
import { getUsers } from "../../../api/account"
export default {
    records: [],
    record: {},
    isFetching: false,
    formVisible: false,

    username_search: "",
    is_active_search: "",

    fetchRecords () {
      this.isFetching = true
      console.log("data_fetched",this.isFetching)
      return getUsers().then(res => {
        this.records = res
      }).finally(() => this.isFetching = false)
    },
    showForm (record = {}) {
      console.log("11", this.record, record)
      this.record = record
      this.formVisible = true
      console.log(this.formVisible)
    }
}
