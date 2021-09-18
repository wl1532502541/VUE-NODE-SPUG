<template>
  <a-layout-content style="padding:24px 24px 0;">
      <div class="container">
        <div class="left">
          <a-menu
            style="border:none"
            :default-selected-keys="['basic']"
            mode="inline"
            v-model="selectedKeys"
          >
            <a-menu-item key="basic">基本设置</a-menu-item>
            <a-menu-item key="security">安全设置</a-menu-item>
            <a-menu-item key="ldap">LDAP设置</a-menu-item>
            <a-menu-item key="key">密钥设置</a-menu-item>
            <a-menu-item key="alarm">报警服务设置</a-menu-item>
            <a-menu-item key="service">开放服务设置</a-menu-item>
            <a-menu-item key="about">关于</a-menu-item>
          </a-menu>
        </div>
        <div class="right">
          <KeySetting v-if="selectedKeys[0]=='key'" />
        </div>
      </div>
          
  </a-layout-content>
</template>

<script>
import KeySetting from "./KeySetting.vue";
export default {
  name: "Setting",
  components: {
    KeySetting,
  },
  data() {
    return {
      selectedKeys:[
        'basic'
      ]
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.container {
    display: flex;
    background-color: #fff;
    padding: 16px 0;
}
.left {
    flex: 2;
    border-right: 1px solid #e8e8e8;
}
.right {
    flex: 7;
    padding: 8px 40px;
}
</style>
