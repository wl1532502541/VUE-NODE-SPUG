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
          <tr v-for="(page,index) in mod.pages" :key="'mod-'+mod.key+'.page-'+page.key">
            <td v-if="index==0" :rowspan="mod.pages.length">{{mod.label}}</td>
            <td>
              <a-checkbox @change="handleAllCheck($event,mod.key,page.key)">{{page.label}}</a-checkbox>
            </td>
            <td>
              <a-row>
                <a-col v-for="(perm,index) in page.perms" :key="'mod-'+mod.key+'.page-'+page.key+'.perm-'+perm.key" span="8">
                  <a-checkbox @change="handlePermCheck(mod.key,page.key,perm.key)" :checked="store.permissions[mod.key][page.key].includes(perm.key)">{{perm.label}}</a-checkbox>
                </a-col>
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
import lodash from 'lodash'
import { patchRole } from '../../../api/account'
export default {
  name: 'PagePerm',
  data () {
    return {
      loading: false,
      store,
      codes
    }
  },
  methods: {
    handleSubmit () {
      this.loading = true
      patchRole(this.store.record._id, { page_perms: this.store.permissions }).then(res => {
        this.$message.success('操作成功')
        this.store.pagePermVisible = false;
        this.store.fetchRecords()
      }, err => {
        this.$message.fail('操作失败')
      }).finally(() => { this.loading = false })
    },
    handleAllCheck (e, mod, page) {
      const checked = e.target.checked;
      if (checked) {
        const key = `${mod}.${page}`
        this.store.permissions[mod][page] = lodash.clone(this.store.allPerms[key])
      } else {
        this.store.permissions[mod][page] = []
      }
    },
    handlePermCheck (mod, page, perm) {
      const perms = this.store.permissions[mod][page];
      if (perms.includes(perm)) {
        perms.splice(perms.indexOf(perm), 1)
      } else {
        perms.push(perm)
      }
    }
  }
}
</script>

<style>
</style>