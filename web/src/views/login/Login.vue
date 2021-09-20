<template>
  <div class="container">
    <div class="titleContainer">
      <p>灵活、强大、功能全面的开源运维平台</p>
    </div>
    <div class="formContainer">
      <a-form id="formLogin" class="user-layout-login" ref="formLogin">
        <div style="margin-top: 36px">
          <a-tabs class="tabs" default-active-key="default" @change="(key)=>{loginType=key}">
            <a-tab-pane key="default" tab="普通登录" />
          </a-tabs>
          <a-alert type="error" v-show="showError" showIcon style="margin-bottom: 24px" message="账户或密码错误" />
          <a-form-item>
            <a-input v-model="username" size="large" type="text" placeholder="请输入账户">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"></a-icon>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input v-model="password" type="password" size="large" placeholder="请输入密码">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </div>
        <a-form-item>
          <a-button block size="large" type="primary" htmlType="submit" class="login-button" @click="handleSubmit">登陆</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import {message} from 'ant-design-vue'
import { mapActions } from 'vuex';
export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      msg: "",
      showError: false,
      loginType:"default",
    };
  },
  mounted() {
    //  判断浏览器中是否存在有效的token，若存在则切换为已登录状态
    // let token = localStorage.getItem("Authorization");
    // if (token !== "" || token != null) {
    //   this.$axios("/auth/check", {
    //     token: token,
    //   }).then((res) => {
    //     if (res.data.code === 200 && res.data.data === true) {
    //       this.$store.commit("setIsLogin", true);
    //       this.$store.commit("setToken", localStorage.getItem("token"));
    //       this.routeTo("/welcome");
    //     } else {
    //       localStorage.setItem("Authorization", "");
    //       this.routeTo("/login");
    //     }
    //   });
    // } else {
    //   this.routeTo("/login");
    // }
  },
  methods: {
    ...mapActions("user",["_login"]),
    handleSubmit() {
      if(!this.username || !this.password){
        message.info('请输入账户和密码')
      }
      this._login({username:this.username,password:this.password}).then(()=>{this.$router.push('/welcome')})
      
    },
    routeTo(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  background-image: url("./bg.svg");
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  .titleContainer {
    padding-top: 70px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }
  .formContainer {
    width: 368px;
    .tabs {
      margin-bottom: 10px;
    }
  }
}
</style>
