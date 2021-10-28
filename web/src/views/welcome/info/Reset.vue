<template>
  <div>
    <h1 class="title">修改密码</h1>
    <a-form class="form">
      <a-form-item label="原密码">
        <a-input-password :value="old_password" placeholder="请输入" @change="(e)=>old_password=e.target.value" />
      </a-form-item>
      <a-form-item label="新密码" placeholder="请输入">
        <a-input-password :value="new_password" placeholder="请输入" @change="(e)=>new_password=e.target.value" />
      </a-form-item>
      <a-form-item label="再次确认" placeholder="请输入">
        <a-input-password :value="new2_password" placeholder="请输入" @change="(e)=>new2_password=e.target.value" />
      </a-form-item>
      <a-button type="primary" :loading="loading" @click="handleSubmit">保存设置</a-button>
    </a-form>
  </div>
</template>

<script>
import './styles.css'
import { patchSelf } from '../../../api/account'
export default {
  name: "Reset",
  data () {
    return {
      loading: false,
      old_password: "",
      new_password: "",
      new2_password: ""
    }
  },
  methods: {
    handleSubmit () {
      if (!this.old_password) {
        return this.$message.error('请输入原密码')
      } else if (!this.new_password) {
        return this.$message.error('请输入新密码')
      } else if (this.new_password !== this.new2_password) {
        return this.$message.error('两次输入密码不一致')
      }
      this.loading = true
      patchSelf({ old_password: this.old_password, new_password: this.new_password }).then(res => {
        this.$message.success('密码修改成功')
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style>
</style>