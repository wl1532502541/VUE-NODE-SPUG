<template>
    <div>
        <a-row style="margin-left: -8px; margin-right: -8px;margin-bottom:20px">
        <a-col :span="8" style="padding-left: 8px; padding-right: 8px;" v-for="(item,index) in statistics" :key="index">
          <a-card>
            <a-statistic :title="item.title" :value="item.data" >
              <template #formatter>
                  <router-link :to="item.path">{{item.data}}</router-link>
              </template>
              <template #suffix style="color:#000000">
                {{item.suffix}}
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </div>
</template>

<script>
import {getHosts} from '../../../api/host'
export default {
  name: "StatisticCards",
  data() {
    return {
      statistics: [
        {
          title: "主机",
          data: 0,
          suffix: "台",
          path: "/host",
        },
        {
          title: "任务",
          data: 0,
          suffix: "个",
          path: "/schedule",
        },
        {
          title: "监控",
          data: 0,
          suffix: "项",
          path: "/monitor",
        },
      ],
    };
  },
  async created(){
    let res = await getHosts()
    this.statistics[0].data= res.total
  }
};
</script>

<style>
</style>