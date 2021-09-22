<template>
  <a-layout-content style="padding:24px 24px 0;minHeight:280px ">
    <div>
      <StatisticCards />
      <!-- <a-card title="报警趋势" style="width: 100%" :bordered="false">
        <a-cascader slot="extra" :options="options" change-on-select @change="onChange" style="width:260px" placeholder="过滤监控项，默认所有" />
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card> -->
    </div>
  </a-layout-content>
</template>

<script>
import StatisticCards from "./components/StatisticCards.vue";

export default {
  name: "Home",
  components: {
    StatisticCards,
  },
  data() {
    return {
      // options: [
      //   {
      //     value: "站点检测",
      //     label: "站点检测",
      //     children: [
      //       {
      //         value: "spug官网",
      //         label: "spug官网",
      //       },
      //     ],
      //   },
      //   {
      //     value: "进程检测",
      //     label: "进程检测",
      //     children: [
      //       {
      //         value: "ssh端口",
      //         label: "ssh端口",
      //       },
      //     ],
      //   },
      // ]
    };
  },
};
</script>
