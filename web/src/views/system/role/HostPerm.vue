<template>
  <a-modal :visible="store.hostPermVisible" width="1000px" :maskClosable="true" title="主机权限设置" :confirmLoading="loading" ok-text="确定" cancel-text="取消" @ok="handleSubmit()" @cancel="store.hostPermVisible=false;form.resetFields()">
  </a-modal>
</template>

<script>
import store from "./store.js"
export default {
  name: 'HostPerm',
  data () {
    return {
      loading: false,
      store
    }
  }
}
</script>

<style>
</style>