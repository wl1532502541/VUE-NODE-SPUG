<template>
  <a-modal :visible="store.pagePermVisible" width="1000px" :maskClosable="true" title="功能权限设置" :confirmLoading="loading" ok-text="确定" cancel-text="取消" @ok="handleSubmit()" @cancel="store.pagePermVisible=false;form.resetFields()">
    <a-alert closable showIcon type="info" style="width:600px;margin:0 auto 20px;color: #31708f !important;" message="小提示">
      <div slot="description">
        <div>功能权限仅影响页面功能，管理发布应用权限请在发布权限中设置。</div>
        <div>权限更改成功后会强制属于该角色的账户重新登录。</div>
      </div>
    </a-alert>
    <table border="1" class="table">
      <thead>
        <tr>
          <th>模块</th>
          <th>页面</th>
          <th>功能</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(mod) in codes">
          <tr v-for="(page,index) in mod.pages" :key="page.key">
            <td v-if="index==0" :rowspan="mod.pages.length">{{mod.label}}</td>
            <td>
              <a-checkbox>{{page.label}}</a-checkbox>
            </td>
            <td>
              <a-row>

              </a-row>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </a-modal>
</template>

<script>
import store from './store.js'
import codes from "./codes"
export default {
  name: 'PagePerm',
  data () {
    return {
      loading: false,
      store,
      codes
    }
  }
}
</script>

<style>
</style>