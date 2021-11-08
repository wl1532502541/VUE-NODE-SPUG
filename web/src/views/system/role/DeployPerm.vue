<template>
  <a-modal :visible="store.deployPermVisible" width="1000px" :maskClosable="true" title="发布权限设置" :confirmLoading="loading" ok-text="确定" cancel-text="取消" @ok="handleSubmit()" @cancel="store.deployPermVisible=false;form.resetFields()">
  </a-modal>
</template>

<script>
import store from "./store.js"
export default {
  name: "DeployPerm",
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