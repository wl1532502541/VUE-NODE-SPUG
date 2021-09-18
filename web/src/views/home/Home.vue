<template>
  <a-layout-content style="padding:24px 24px 0;minHeight:280px ">
    <div>
      <a-row style="margin-left: -8px; margin-right: -8px;margin-bottom:20px">
        <a-col :span="8" style="padding-left: 8px; padding-right: 8px;" v-for="(item,index) in statistics" :key="index">
<!--          <router-link :to="item.path" style="color:#1890FF;cursor:pointer;">
            {{item.data}}
          </router-link>-->
          <a-card>
            <a-statistic :title="item.title" value-style="color:#1890FF">
              
              <template #value>
                <router-link :@click="$router.push('/deploy/app')">
                  {{item.data}}
                </router-link>
                <p >
                     1111
                  </p>
                <div style="color:#1890FF;cursor:pointer;">
                  
                </div>
              </template>
              <template #suffix style="color:#000000">
                <router-link>s</router-link>
                {{item.suffix}}
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
      <a-card title="报警趋势" style="width: 100%" :bordered="false">

        <a-cascader slot="extra" :options="options" change-on-select @change="onChange" style="width:260px" placeholder="过滤监控项，默认所有"/>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card>
    </div>
  </a-layout-content>
</template>

<script>


export default {
  name: "Home",
  components: {
    
  },
  data() {
    return {
      options:[{
                value: "站点检测",
                label: "站点检测",
                children:[{
                            value: "spug官网",
                            label: "spug官网"
                          }]
              },
              {
                value: "进程检测",
                label: "进程检测",
                children:[{
                  value: "ssh端口",
                  label: "ssh端口"
                }]
              }]
      ,
      statistics:[
      {
        title:"主机",
        data:0,
        suffix:"台",
        path:"/host"
      },
      {
        title:"任务",
        data:0,
        suffix:"个",
        path:"/host"
      },
      {
        title:"监控",
        data:0,
        suffix:"项",
        path:"/host"
      }]
    }
  },
};
</script>
