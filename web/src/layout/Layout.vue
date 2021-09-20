<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <!-- 侧边栏 -->
    <a-layout-sider v-model="collapsed" collapsible :trigger="null">
      <div class="logo" />
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline" :defaultSelectedKeys="[$route.path]" :selectedKeys="[$route.path]">
        <!-- 工作台 主机管理 -->
        <a-menu-item v-for="route in routers.slice(0, 2)" :key="route.path" @click="$router.push(route.path)">
          <a-icon :type="route.iconType" />
          <span>{{ route.name }}</span>
        </a-menu-item>
        <!-- 批量执行 应用发布 -->
        <a-sub-menu v-for="router in routers.slice(2, 4)" :key="router.path">
          <span slot="title">
            <a-icon :type="router.iconType" />
            <span>{{ router.name }}</span>
          </span>
          <a-menu-item v-for="child in router.children" :key="child.path" @click="$router.push(child.path)">
            {{ child.name }}
          </a-menu-item>
        </a-sub-menu>
        <!--   任务计划     -->
        <a-menu-item v-for="router in routers.slice(4, 5)" :key="router.path" @click="$router.push(router.path)">
          <a-icon :type="router.iconType" />
          <span>{{ router.name }}</span>
        </a-menu-item>
        <!--  配置中心  -->
        <a-sub-menu v-for="router in routers.slice(5, 6)" :key="router.path">
          <span slot="title">
            <a-icon :type="router.iconType" />
            <span>{{ router.name }}</span>
          </span>
          <a-menu-item v-for="child in router.children" :key="child.path" @click="$router.push(child.path)">
            {{ child.name }}
          </a-menu-item>
        </a-sub-menu>
        <!--  监控中心  -->
        <a-menu-item v-for="router in routers.slice(6,7)" :key="router.path" @click="$router.push(router.path)">
          <a-icon :type="router.iconType" />
          {{router.name}}
        </a-menu-item>

        <!-- 报警中心 系统管理-->
        <a-sub-menu v-for="router in routers.slice(7, 9)" :key="router.path">
          <span slot="title">
            <a-icon :type="router.iconType" />
            <span>{{ router.name }}</span>
          </span>
          <a-menu-item v-for="child in router.children" :key="child.path" @click="$router.push(child.path)">
            {{ child.name }}
          </a-menu-item>
        </a-sub-menu>
        <!-- 退出 -->
        <!-- <a-menu-item :key="routers.length - 1">
          <a-icon type="pie-chart" />
          <span>退出</span>
        </a-menu-item> -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
        <div class="right">
          <a-dropdown>
            <span class="action">
              <a-avatar size="small" :src="require('./avatar.png')" style="margin-right:8px" />
              {{this.$store.state.user.userName}}
            </span>
            <a-menu slot="overlay">
              <a-menu-item>
                  <a-icon type="user" style="margin-right:10px"/>个人中心
              </a-menu-item>
              <a-menu-item  @click="handleLogout()">
                  <a-icon type="logout" style="margin-right:10px"/>退出登陆
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <router-view />
      <a-layout-footer>
        Scorpio ©2021 Created by Meteor
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "Layout",
  data() {
    return {
      collapsed: false,
      menuSelected: 1,
      routers: [
        { id: 1, name: "工作台", path: "/home", iconType: "desktop" },
        { id: 2, name: "主机管理", path: "/host", iconType: "cloud-server" },
        {
          id: 3,
          name: "批量执行",
          children: [
            { name: "执行任务", path: "/exec/task" },
            { name: "模板管理", path: "/exec/template" },
          ],
          iconType: "code",
        },
        {
          id: 4,
          name: "应用发布",
          children: [
            { name: "应用管理", path: "/deploy/app" },
            { name: "发布申请", path: "/deploy/request" },
          ],
          iconType: "flag",
        },
        {
          id: 5,
          name: "任务计划",
          path: "/schedule",
          iconType: "flag",
        },
        {
          id: 6,
          name: "配置中心",
          children: [
            { name: "环境管理", path: "/config/environment" },
            { name: "服务配置", path: "/config/service" },
            { name: "应用配置", path: "/config/app" },
          ],
          iconType: "deployment-unit",
        },
        {
          id: 7,
          name: "监控中心",
          path: "/monitor",
          iconType: "monitor",
        },
        {
          id: 8,
          name: "报警中心",
          children: [
            { name: "报警历史", path: "/alarm/history" },
            { name: "报警联系人", path: "/alarm/contact" },
            { name: "报警联系组", path: "/alarm/group" },
          ],
          iconType: "alert",
        },
        {
          id: 9,
          name: "系统管理",
          children: [
            { name: "账户管理", path: "/system/account" },
            { name: "角色管理", path: "/system/role" },
            { name: "系统设置", path: "/system/setting" },
          ],
          iconType: "setting",
        },
        {
          id: 10,
          name: "退出",
          path: "/logout",
        },
      ],
    };
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
};
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
</style>