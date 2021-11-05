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
    <comTable />
  </a-card>
</template>

<script>
import SearchForm from "../../../components/searchForm/SearchForm.vue";
import SearchFormItem from "../../../components/searchForm/SearchFormItem.vue";
import store from "./store.js"
import comTable from "./Table.vue"

export default {
  name: "Role",
  components: { SearchForm, SearchFormItem, comTable },
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
</style>
