<template>
  <router-view></router-view>
</template>
<script>
export default {
  created(){
    console.log(1)
  },
  computed:{
    // isLogin(){return this.$store.state.isLogin}
  },
  data() {
    return {
    };
  }
};
</script>
<style lang="scss">
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
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

#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
