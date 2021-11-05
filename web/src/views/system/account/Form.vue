<template>
  <a-modal :title="store.record._id ? '编辑账户' : '新建账户'" :visible="store.formVisible" :confirmLoading="loading" ok-text="确定" cancel-text="取消" @ok="handleSubmit()" @cancel="store.formVisible=false;form.resetFields()" width="800px" :maskClosable="false">
    <a-form layout="horizontal" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" :form="form">
      <a-form-item label="登录名">
        <a-input placeholder="请输入登录名" v-decorator="[
            'username',
            { rules: [{ required: true }], initialValue: store.record.username },
          ]">
        </a-input>
      </a-form-item>
      <a-form-item required label="姓名">
        <a-input v-decorator="[
              'nickname',
              { rules: [{ required: true }], initialValue: store.record.nickname },
            ]" placeholder="请输入姓名">
        </a-input>
      </a-form-item>
      <a-form-item label="密码" v-if="!store.record._id">
        <a-input v-decorator="[
              'password',
              { rules: [{ required: true }],},
            ]" placeholder="请输入密码">
        </a-input>
      </a-form-item>
      <a-form-item label="角色">
        <a-col :span="18">
          <a-select placeholder="请选择" v-decorator="[
              'role',
              { rules: [{ required: true }], initialValue: store.record.role&&store.record.role._id },
            ]">
            <a-select-option v-for="(item,index) in store.roles" :key="index" :value="item._id">{{item.name}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4" offset="2">
          <a-button type="link" @click="$router.push('/system/role')">新建角色</a-button>
        </a-col>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import store from "./store"
import { addUser, patchUser, deleteUser } from '../../../api/account'
export default {
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this, { name: "form" }),
      store: store
    };
  },
  created () {
    console.log("form_stroe", this.store)
  },
  methods: {
    handleSubmit () {
      this.loading = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          const _id = this.store.record._id
          if (_id) {
            patchUser(_id, values).then((res) => {
              this.$message.success("操作成功")
              store.formVisible = false
              store.fetchRecords()
            }).finally(() => {
              setTimeout(() => {
                this.loading = false
              }), 2000
            })
          } else {
            addUser(values).then(res => {
              this.$message.success("新增成功")
              store.formVisible = false
              this.loading = false
              store.fetchRecords()
            }, err => {
              this.loading = false
            })
          }

        }
      });
    },
  },
};
</script>

<style></style>
