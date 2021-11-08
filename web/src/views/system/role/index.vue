<template>
  <a-card>
    <SearchForm>
      <SearchFormItem :md="8" label="角色名称">
        <a-input :value="store.name_search" placeholder="请输入" @change="(e) => store.name_search = e.target.value" allowClear />
      </SearchFormItem>
      <SearchFormItem :md="6">
        <a-button type="primary" @click="handleRefresh()" icon="sync">
          刷新
        </a-button>
      </SearchFormItem>
    </SearchForm>
    <div style="margin: 0 0 16px">
      <a-button type="primary" @click="store.showForm({})" icon="plus">
        新建
      </a-button>
    </div>
    <ComTable />
    <ComForm />
    <PagePerm />
    <DeployPerm />
    <HostPerm />
  </a-card>
</template>

<script>
import SearchForm from "../../../components/searchForm/SearchForm.vue";
import SearchFormItem from "../../../components/searchForm/SearchFormItem.vue";
import store from "./store.js"
import ComTable from "./Table.vue"
import ComForm from "./Form.vue"
import PagePerm from "./PagePerm.vue";
import DeployPerm from "./DeployPerm.vue"
import HostPerm from "./HostPerm.vue"

export default {
  name: "Role",
  components: { SearchForm, SearchFormItem, ComTable, ComForm, PagePerm, DeployPerm, HostPerm },
  data () {
    return {
      store: store
    };
  },
  methods: {
    handleRefresh () {
      store.fetchRecords()
    }
  }

};
</script>

<style>
.container :global(.ant-modal-footer) {
  border-top: 0;
}

.table {
  width: 100%;
  border: 1px solid #dfdfdf;
}

.table :global(.ant-checkbox-group) {
  width: 100%;
}

.table th {
  background-color: #fafafa;
  color: #404040;
  font-size: 18px;
  font-weight: 500;
  padding: 5px 15px;
}

.table td {
  padding: 5px 15px;
}
</style>
