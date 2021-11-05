<template>
  <a-table rowKey="name" :columns="columns" :data-source="data_filtered" :loading="store.isFetching">
    <span slot="action" slot-scope="record">
      <a @click="store.showForm(record)">编辑</a>
      <a-divider type="vertical" />
      <a @click="store.showPagePerm(record)">功能权限</a>
      <a-divider type="vertical" />
      <a @click="store.showDeployPerm(record)">发布权限</a>
      <a-divider type="vertical" />
      <a @click="store.showHostPerm(record)">主机权限</a>
      <a-divider type="vertical" />
      <a @click="handleDelete(record)">删除</a>
    </span>
  </a-table>
</template>

<script>
import store from './store'
export default {
  name: 'role_Table',
  data () {
    return {
      columns,
      store: store,
    }
  },
  created () {
    store.fetchRecords()
  },
  computed: {
    data_filtered () {
      let data_filtered = this.store.records
      if (store.name_search) data_filtered = data_filtered.filter(item => item.name.includes(store.name_search))
      // if (store.is_active_search) data_filtered = data_filtered.filter(item => item.is_active.toString() == store.is_active_search)
      return data_filtered
    },
  },
  methods: {

  }

}
const columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
  }, {
    title: '关联账户',
    dataIndex: 'used',
  }, {
    title: '描述信息',
    dataIndex: 'desc',
    ellipsis: true
  }, {
    title: '操作',
    width: 400,
    scopedSlots: { customRender: "action" }
  }
];
</script>

<style>
</style>