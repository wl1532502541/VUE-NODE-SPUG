<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <Sider :collapsed="collapsed" />
    <a-layout>
      <Header :collapsed="collapsed" @toggle="toggleCollapsed" />
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer>
        Scorpio ©2021 Created by Meteor
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapActions } from 'vuex';
import Sider from './components/Sider.vue';
import Header from './components/Header.vue'
export default {
  name: "Layout",
  components: {
    Sider,
    Header
  },
  data () {
    return {
      collapsed: false,
      menuSelected: 1,
      openKeys: [],

    };
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    }
  },
  created () {
    // console.log("/"+this.$route.path.split("/")[1])
  }
};
</script>

<style scoped lang="scss">
.content {
  padding: 24px;
  min-height: 280px;
}
</style>