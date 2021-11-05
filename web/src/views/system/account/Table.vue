<template>
  <a-table rowKey="username" :columns="columns" :data-source="data_filtered" :loading="store.isFetching">
    <span slot="is_active" slot-scope="text">
      <a-badge :status="text.toString()=='true'?'success':'default'" :text="text.toString()=='true'?'正常':'禁用'" />
    </span>
    <span slot="role" slot-scope="record">
      {{record.name}}
    </span>
    <span slot="action" slot-scope="record">
      <a @click="handleActive(record)">{{record.is_active?'禁用':'启用'}}</a>
      <a-divider type="vertical" />
      <a @click="store.showForm(record)">编辑</a>
      <a-divider type="vertical" />
      <a @click="handleResetPwd(record)">重置密码</a>
      <a-divider type="vertical" />
      <a @click="handleDelete(record)">删除</a>
      <a-divider type="vertical" />
    </span>
  </a-table>
</template>

<script>
import store from './store'
import { deleteUser, patchUser } from '../../../api/account'
import SettingVue from '../setting/Setting.vue'
export default {
  name: 'Table',
  data () {
    return {
      columns,
      store: store,
      password: ""
    }
  },
  // inject: ['vm'],
  created () {
    store.fetchRecords()
  },
  computed: {
    data_filtered () {
      let data_filtered = store.records
      if (store.username_search) data_filtered = data_filtered.filter(item => item.username.includes(store.username_search))
      if (store.is_active_search) data_filtered = data_filtered.filter(item => item.is_active.toString() == store.is_active_search)
      return data_filtered
    },
  },
  methods: {
    handleActive (record) {
      this.$confirm({
        title: '操作确认',
        okText: "确定",
        cancelText: "取消",
        // content: h => <div>确定要禁用 ？</div>,
        content: `确定要${record.is_active ? '禁用' : '启用'}【${record.nickname}】?`,
        onOk: () => {
          patchUser(record._id, { is_active: !record.is_active }).then((res) => {
            this.store.fetchRecords().then((res) => {
              this.$message.success('修改成功')
            })
          })
        },
      });
    },
    //重置密码对话框
    handleResetPwd: function (record) {
      this.$confirm({
        icon: 'exclamation-circle',
        title: '重置登录密码',
        okText: "确定",
        cancelText: "取消",
        content: h => <a-form>
          <a-form-item required label="重置后的新密码">
            <a-input-password onChange={e => { this.password = e.target.value }} />
          </a-form-item>
        </a-form>
        ,
        onOk: () => {
          return patchUser(record._id, { password: this.password }).then(() => {
            this.$message.success('重置成功', 0.5)
          })
        }
      });
    },
    handleDelete (record) {
      this.$confirm({
        title: '删除确认',
        okText: "确定",
        cancelText: "取消",
        content: `确定要删除【${record.nickname}】?`,
        onOk: () => {
          deleteUser(record._id).then(res => {
            this.$message.success("删除成功")
            store.formVisible = false
            store.fetchRecords()
          })
        },
      });
    }
  }

}
const columns = [
  {
    title: '序号',
    key: 'series',
    customRender: (_, __, index) => index + 1,
    width: 80
  },
  {
    title: "登录名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "昵称",
    key: "nickname",
    dataIndex: "nickname",
  },
  {
    title: "角色",
    key: "role",
    dataIndex: "role",
    scopedSlots: {
      customRender: "role"
    }
  },
  {
    title: "状态",
    key: "is_active",
    dataIndex: "is_active",
    scopedSlots: {
      customRender: "is_active"
    }
  },
  {
    title: "操作",
    key: "hostAction",
    scopedSlots: { customRender: "action" }
  }
];
</script>

<style>
</style>