<template>
  <a-card>
    <a-form
        layout="horizontal"
        :label-col="{ flex:'75px'  }"
        :wrapper-col="{ flex:'auto' }"
    >
      <a-row :gutter="12">

        <a-col :sm="24" :md="6">
          <a-form-item label="任务名称：" style="display: flex">
            <a-input placeholder="请输入"> </a-input>
          </a-form-item>
        </a-col>
        <a-col :sm="24" :md="6">
          <a-form-item>
            <a-button type="primary" @click="clickRefresh">
              <a-icon type="sync"></a-icon>
              刷新
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-spin :spinning="spinning">
      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"> 任务名称</span>
        <span slot="updateTime" slot-scope="updateTime">{{ updateTime.toLocaleString() }}</span>
        <span slot="tags" slot-scope="tags">
          <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="
              tag == '正常' ? 'green' : tag=='异常' ? 'red':tag=='报警发生'?'yellow':'blue'
              /*tag === 'loser'
              ? 'volcano'
              : tag.length > 5
              ? 'geekblue'
              : 'green'*/
            "
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </a-table>
    </a-spin>
  </a-card>
</template>

<script>
import {throttle} from "../../libs";

export default {
  name: "History",
  data() {
    return {
      //表格 数据 字段
      data,
      columns,
      //按钮 刷新
      spinning: false,
    };
  },
  methods: {
    clickRefresh:function(){
      console.log("2");
      this.spinning = !this.spinning;
      let that = this;
      let fn=setTimeout(function() {
        that.spinning = !that.spinning;
      }, 500);
      console.log('pre')
      throttle(fn,5000)()
      console.log('after')
    },
  }
};
const data = [
  {
    key: "1",
    taskName: "ssh端口",
    monitorType: "端口检测",
    informType: '邮件',
    informGroup: '运维组',
    tags: ["报警发生"],
    updateTime: new Date(),
    describe: ""
  },
  {
    key: "2",
    taskName: "ssh端口",
    monitorType: "端口检测",
    informType: "邮件",
    informGroup: '运维组',
    tags: ["报警发生"],
    updateTime: new Date(),
    describe: ""
  },
  {
    key: "3",
    taskName: "ssh端口",
    monitorType: "端口检测",
    informType: "邮件",
    informGroup: '运维组',
    tags: ['报警发生'],
    updateTime: new Date(),
    describe: ""
  }
];
const columns = [
  {
    dataIndex: "taskName",
    key: "taskName",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "taskName" }
  },
  {
    title: "监控类型",
    dataIndex: "monitorType",
    key: "monitorType"
  },
  {
    title: "状态",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "通知方式",
    dataIndex: "informType",
    key: "informType"
  },
  {
    title: "通知对象",
    dataIndex: "informGroup",
    key: "informGroup"
  },
  {
    title: "发生时间",
    key: "updateTime",
    dataIndex: "updateTime",
    /*defaultSortOrder: 'descend',*/
    /*sorter: (a, b) => a.updateTime - b.updateTime,*/

    scopedSlots: {customRender:"updateTime"}
  }
];
</script>

<style scoped></style>
