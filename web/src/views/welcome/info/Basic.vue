<template>
  <div>
    <h1 class="title">基本设置</h1>
    <a-form class="form">
      <a-form-item :colon="false" label="昵称">
        <a-input :value="nickname" placeholder="请输入" @change="(e)=>nickname=e.target.value"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" :loading="loading" @click="handleSubmit()">保存设置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import './styles.css'
import { patchSelf } from '../../../api/account'
export default {
  name: "Basic",
  data () {
    return {
      nickname: localStorage.getItem('nickname'),
      loading: false
    }
  },
  methods: {
    handleSubmit () {
      this.loading = true
      patchSelf({ nickname: this.nickname }).then(res => {
        this.$message.success('修改成功，重新登陆或刷新页面生效')
        localStorage.setItem('nickname', this.nickname)
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style>
</style>