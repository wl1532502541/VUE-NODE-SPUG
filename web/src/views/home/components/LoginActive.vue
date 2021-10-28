<template>
  <div>
    <a-card :loading="loading" title="最近30天登陆">
      <a-list :data-source="histories" style="height:329px;overflow:scroll">
        <a-list-item slot="renderItem" slot-scope="item,index">
          <span>{{item.created_at.replace("T"," ").replace("Z","").slice(0,-4)}}</span>
          <span class="spanText">{{item.user.nickname}}</span>
          <span>通过</span>
          <span class="spanText">{{item.ip}}</span>
          <span>登录</span>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { getHistories } from '../../../api/account'
export default {
  name: "LoginActive",
  data () {
    return {
      loading: true,
      histories: []
    };
  },
  created () {
    getHistories().then((res) => {
      this.histories = res
      // console.log(this.histories)
    }).finally(this.loading = false)
  }
};
</script>

<style>
.spanText {
  /* cursor: pointer; */
  color: #1890ff;
  padding: 0 4px;
}
.ant-list-item {
  justify-content: left;
}
</style>