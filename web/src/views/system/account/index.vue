<template>
  <a-card>
    <SearchForm>
      <SearchFormItem :md="8" label="账户名称：">
        <a-input :value="store.username_search" placeholder="请输入" @change="(e) => store.username_search = e.target.value" allowClear />
      </SearchFormItem>
      <SearchFormItem :md="8" label="账户状态：">
        <a-select placeholder="请选择" @change="v => store.is_active_search = v" allowClear>
          <a-select-option value="true">
            正常
          </a-select-option>
          <a-select-option value="false">
            禁用
          </a-select-option>
        </a-select>
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
    <comTable />
    <comForm />
  </a-card>
</template>

<script>
import SearchForm from "../../../components/searchForm/SearchForm.vue";
import SearchFormItem from "../../../components/searchForm/SearchFormItem.vue";
import comTable from "./Table.vue"
import comForm from "./Form.vue"
import store from './store'

export default {
  name: "Account",
  components: { SearchForm, SearchFormItem, comTable, comForm },
  data () {
    return {
      store: store,
    };
  },
  // provide () {
  //   return {
  //     vm: this
  //   }
  // },
  created () {
    console.log("index_store", this.store)
  },
  methods: {
    handleRefresh: function () {
      store.fetchRecords()
    },
  }

};
</script>

<style>
</style>
