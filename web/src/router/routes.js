const loginRoutes=[
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login")
  },
]

const viewsRoutes=[
  {
    path: "/",
    name: "Layout",
    redirect:"/login",
    component:()=>import("@/layout/Layout"),
    children:[
      // 工作台
      {
        path:"home",
        name:"Home",
        component: () => import("@/views/home/Home")
      },
      //登陆后的欢迎
      {
        path:"welcome",
        name:"welcome",
        component:()=>import("@/views/welcome/Welcome")
      },
      {
        path:"welcome/info",
        component:()=>import("@/views/welcome/Info")
      },
      // 主机管理
      {
        path: "host",
        name: "Host",
        component: () => import("@/views/host/Host")
      },
      // 批量执行
      {
        path: "exec/task",
        name: "ExecTask",
        component: () => import("@/views/exec/Task")
      },
      {
        path: "exec/template",
        name: "Template",
        component: () => import("@/views/exec/Template")
      },
      // 应用发布
      {
        path: "deploy/app",
        name: "App",
        component: () => import("@/views/deploy/App")
      },
      {
        path: "deploy/request",
        name: "Request",
        component: () => import("@/views/deploy/Request")
      },
      //任务计划
      {
        path: "schedule",
        name: "TaskPlan",
        component: () => import("@/views/schedule/Schedule")
      },
      //配置中心
      {
        path: "config/app",
        name: "App",
        component: () => import("@/views/config/App")
      },
      {
        path: "config/environment",
        name: "Environment",
        component: () => import("@/views/config/Environment")
      },
      {
        path: "config/service",
        name: "Service",
        component: () => import("@/views/config/Service")
      },
      //监控中心
      {
        path: "monitor",
        name: "Monitor",
        component: () => import("@/views/monitor/Monitor")
      },
      //报警中心
      {
        path: "alarm/history",
        name: "Alarm/History",
        component: () => import("@/views/alarm/History")
      },
      {
        path: "alarm/contact",
        name: "Alarm/Contact",
        component: () => import("@/views/alarm/Contact")
      },
      {
        path: "alarm/group",
        name: "Alarm/Group",
        component: () => import("@/views/alarm/Group")
      },
      //系统管理
      {
        path: "system/account",
        name: "Account",
        component: () => import("@/views/system/Account")
      },
      {
        path: "system/role",
        name: "Role",
        component: () => import("@/views/system/Role")
      },
      {
        path: "system/setting",
        name: "Setting",
        component: () => import("@/views/system/setting/Setting")
      }
    ]
  },

]

const sshRoutes=[
  {
    path:"/ssh/:id",
    name:"ssh",
    component:()=>import("@/views/ssh/Ssh")
  }
]

const routes=[...loginRoutes,...sshRoutes,...viewsRoutes]

export default routes