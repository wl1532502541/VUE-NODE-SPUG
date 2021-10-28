<template>
  <!-- 侧边栏 -->
  <a-layout-sider v-model="collapsed" collapsible :trigger="null">
    <div class="logo">
      <img src="../logo-spug.png" alt="logo-spug">
      <img src="../logo-text.png" alt="logo-text">
      <span style="color: rgba(24,155, 255);margin-left:5px">(仿)</span>
    </div>
    <a-menu theme="dark" :default-selected-keys="['1']" mode="inline" :defaultSelectedKeys="[$route.path]" :selectedKeys="[$route.path]" :defaultOpenKeys="['/'+$route.path.split('/')[1]]">
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
        <a-icon :type="router.iconType" />{{router.name}}
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
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: "Sider",
  props: {
    collapsed: Boolean,
  },
  data () {
    return {
      routers: [
        { id: 1, name: "工作台", path: "/home", iconType: "desktop" },
        { id: 2, name: "主机管理", path: "/host", iconType: "cloud-server" },
        {
          id: 3,
          name: "批量执行",
          path: "/exec",
          children: [
            { name: "执行任务", path: "/exec/task" },
            { name: "模板管理", path: "/exec/template" },
          ],
          iconType: "code",
        },
        {
          id: 4,
          name: "应用发布",
          path: "/deploy",
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
          iconType: "schedule",
        },
        {
          id: 6,
          name: "配置中心",
          path: "/config",
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
          path: "/alarm",
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
          path: "/system",
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
};
</script>

<style scoped lang="scss">
#components-layout-demo-side .logo {
  height: 64px;
  overflow: hidden;
  line-height: 64px;
  padding-left: 10px;
  img {
    width: 50px;
    &:nth-child(2) {
      margin-left: 25px;
      width: 70px;
    }
  }
}
</style>