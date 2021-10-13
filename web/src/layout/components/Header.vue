<template>
  <a-layout-header style="background: #fff; padding: 0;">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => $emit('toggle') "/>
        <div class="right">
          <a-dropdown>
            <span class="action">
              <a-avatar size="small" :src="require('../avatar.png')" style="margin-right:8px" />
              {{nickname}}
            </span>
            <a-menu slot="overlay">
              <a-menu-item @click="$router.push('/welcome/info')">
                  <a-icon type="user" style="margin-right:10px"/>个人中心
              </a-menu-item>
              <a-menu-item  @click="handleLogout()">
                  <a-icon type="logout" style="margin-right:10px"/>退出登陆
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
</template>

<script>
import {mapActions} from "vuex"
export default {
    name:"Header",
    props:{
        collapsed:Boolean
    },
    data(){
      return{
        nickname:localStorage.getItem('nickname'),
      }
    },
    methods:{
      ...mapActions(['_resetVuex']),
      ...mapActions('user',['_logout']),
      handleLogout(){
        this._logout();
        this.$router.push('/login')
        this._resetVuex();
      }
    }
}
</script>

<style scoped>
.right {
  float: right;
  height: 100%;
}
.action {
  cursor: pointer;
  padding: 0 12px;
  display: inline-block;
  height: 100%;
}
.action:hover {
  background-color: rgb(233, 247, 254);
}



#components-layout-demo-side .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
#components-layout-demo-side .trigger:hover {
  color: #1890ff;
}
</style>