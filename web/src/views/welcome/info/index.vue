<template>
  <a-card>
    <div class="container">
      <div class="left">
        <a-menu style="border:none" :default-selected-keys="['basic']" mode="inline" v-model="selectedKeys">
          <a-menu-item key="basic">基本设置</a-menu-item>
          <a-menu-item key="reset">修改密码</a-menu-item>
        </a-menu>
      </div>
      <div class="right">
        <!-- <Basic v-if="selectedKeys[0]=='basic'" />
        <Reset v-if="selectedKeys[0]=='reset'" /> -->
        <component keep-alive :is="selectedKeys[0]"></component>
      </div>
    </div>
  </a-card>
</template>

<script>
import Basic from "./Basic.vue";
import Reset from "./Reset.vue";
export default {
  name: "Info",
  components: { Basic: Basic, Reset: Reset },
  data () {
    return {
      selectedKeys: ["basic"],
    };
  },
  components: { Basic, Reset }
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