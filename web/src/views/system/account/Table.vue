<template>
  <a-table rowKey="username" :columns="columns" :data-source="data_filtered" :loading="store.isFetching">
    <span slot="is_active" slot-scope="text">
      <a-badge :status="text.toString()=='true'?'success':'default'" :text="text.toString()=='true'?'正常':'禁用'" />
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
import { patchUser } from '../../../api/account'
export default {
  name: 'Table',
  data () {
    return {
      columns,
      store: store,
    }
  },
  // inject: ['vm'],
  created () {
    // console.log("table_store", this.store)
    store.fetchRecords()
    // console.log(this)
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
      let message = this.$message
      const _this = this
      this.$confirm({
        title: '操作确认',
        // content: h => <div>确定要禁用 ？</div>,
        content: `确定要${record.is_active ? '禁用' : '启用'}【${record.nickname}】?`,
        onOk () {
          patchUser({ _id: record._id, is_active: !record.is_active }).then((res) => {
            _this.store.fetchRecords().then((res) => {
              message.success('修改成功')
            })
          })
        },
        // class: 'test',
      });
    },
    //重置密码对话框
    handleResetPwd: function () {
      this.$warning({
        title: '重置登录密码',
        content: h => <div><a-input /></div> /*<a-form layout="horizontal" :form=this.formResetPwd>
          <a-form-item label="重置后的新密码：">
            <a-input v-decorator="[
                      'templateType',
                      {
                        rules: [
                          {
                            required: true,
                            message: 'Please select your gender!'
                          }
                        ]
                      }
                    ]">

            </a-input>
          </a-form-item>
        </a-form>*/
        ,
        onOk () { },
      });
    },
    handleDelete (record) {
      this.$confirm({
        title: '删除确认',
        content: h => <div style="color:red;">确定要删除 ？</div>,
        onOk () {
          console.log('确定');
        },
        onCancel () {
          console.log('取消');
        },
        class: 'test',
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
    dataIndex: "role"
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