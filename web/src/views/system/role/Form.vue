<template>
  <a-modal :title="store.record._id ? '编辑账户' : '新建账户'" :visible="store.formVisible" :confirmLoading="loading" ok-text="确定" cancel-text="取消" @ok="handleSubmit()" @cancel="store.formVisible=false;form.resetFields()" width="800px" :maskClosable="false">
    <a-form layout="horizontal" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" :form="form">
      <a-form-item label="角色名称">
        <a-input placeholder="请输入角色名称" v-decorator="[
            'name',
            { rules: [{ required: true }], initialValue: store.record.name },
          ]">
        </a-input>
      </a-form-item>
      <a-form-item label="备注信息">
        <a-input v-decorator="[
              'desc',
              {  initialValue: store.record.desc },
            ]" placeholder="请输入角色备注信息">
        </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import store from "./store"
import { addRole, patchRole, deleteRole } from '../../../api/account'
export default {
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this, { name: "form" }),
      store: store
    };
  },
  methods: {
    handleSubmit () {
      this.loading = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          const _id = this.store.record._id
          if (_id) {
            console.log(_id, values)
            patchRole(_id, values).then((res) => {
              this.$message.success("操作成功")
              store.formVisible = false
              store.fetchRecords()
            }).finally(() => { this.loading = false })
          } else {
            addRole(values).then(res => {
              this.$message.success("新增成功")
              store.formVisible = false
              this.loading = false
              store.fetchRecords()
            }, err => {
              this.loading = false
            })
          }
          this.form.resetFields();
        }
      });
    },
  },
};
</script>

<style></style>
