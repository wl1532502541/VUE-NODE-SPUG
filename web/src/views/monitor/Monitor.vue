<template>
  <a-layout-content style="padding:24px;minHeight:280px ">
    <a-card>
      <a-form
          layout="horizontal"
          :label-col="{ flex:'75px'  }"
          :wrapper-col="{ flex:'auto' }"
      >
        <a-row :gutter="16">
          <a-col :sm="24" :md="6">
            <a-form-item label="任务名称：" style="display: flex">
              <a-input placeholder="请输入"> </a-input>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :md="6">
            <a-form-item label="检测类型：" style="display: flex">
              <a-select placeholder="请选择">
                <a-select-option value="siteInspection">
                  站点检测
                </a-select-option>
                <a-select-option value="portInspection">
                  端口检测
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :md="6">
            <a-form-item label="任务状态：" style="display: flex">
              <a-select placeholder="请选择">
                <a-select-option value="notActive">
                  未激活
                </a-select-option>
                <a-select-option value="active">
                  已激活
                </a-select-option>
                <a-select-option value="standBy">
                  待检测
                </a-select-option>
                <a-select-option value="success">
                  正常
                </a-select-option>
                <a-select-option value="unusual">
                  异常
                </a-select-option>
              </a-select>
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
      <div style="margin: 0 0 16px">
        <a-button type="primary" @click="showModal">
          <a-icon type="plus"></a-icon>
          新建
        </a-button>
        <a-modal title="新建任务" :visible="visible" :confirm-loading="confirmLoading" ok-text="确定" cancel-text="取消"
                 @ok="handleOk"
                 @cancel="handleCancel">

        </a-modal>
      </div>
      <a-spin :spinning="spinning">
        <a-table :columns="columns" :data-source="data">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"> 任务名称</span>
          <span slot="updateTime" slot-scope="updateTime">{{ Math.floor((Date.now()-updateTime)/60000) +"分钟前" }}</span>
          <span slot="tags" slot-scope="tags">
            <a-tag
                v-for="tag in tags"
                :key="tag"
                :color="
                tag == '正常' ? 'green' : tag=='异常' ? 'red':tag=='待检测'?'yellow':'blue'
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
          <span slot="action">
            <a-button>禁用</a-button>
            <a-divider type="vertical" />
            <a-button>编辑</a-button>
            <a-divider type="vertical" />
            <!--<a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>-->
<!--            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                更多 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="0">
                  <a href="http://www.alipay.com/">执行测试</a>
                </a-menu-item>
                <a-menu-item key="1">
                  <a href="http://www.taobao.com/">禁用任务</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <a href="http://www.taobao.com/">历史记录</a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="3">
                  删除
                </a-menu-item>
              </a-menu>
            </a-dropdown>-->
            <a-button>删除</a-button>
            <a-modal >
              s
            </a-modal>
          </span>
        </a-table>
      </a-spin>
    </a-card>
  </a-layout-content>
</template>

<script>
import {throttle} from "../../libs";

export default {
  name: "Monitor",
  data() {
    return {
      //表格 数据 字段
      data,
      columns,
      //按钮 刷新
      spinning: false,
      //按钮-新建
      visible:false,
      confirmLoading:false
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 200);
    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.visible = false;
    },
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
    }
  }
};
const data = [
  {
    key: "1",
    taskName: "检查支付状态",
    taskType: "订单服务",
    location: '127.0.0.1',
    frequency: '5分钟',
    tags: ["异常"],
    updateTime: Date.now()-60000,
    describe: ""
  },
  {
    key: "2",
    taskName: "关闭超时订单",
    taskType: "订单服务",
    location: "https://spug.dev",
    frequency: '5分钟',
    tags: ["正常"],
    updateTime: Date.now()-120000,
    describe: ""
  },
  {
    key: "3",
    taskName: "asdf",
    taskType: "站点检测",
    location: "https://spug.dev",
    frequency: '15分钟',
    tags: ['待检测'],
    updateTime: Date.now()-120000,
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
    title: "类型",
    dataIndex: "taskType",
    key: "taskType"
  },
  {
    title: "地址",
    dataIndex: "location",
    key: "location"
  },
  {
    title: "频率",
    dataIndex: "frequency",
    key: "frequency"
  },
  {
    title: "状态",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "更新于",
    key: "updateTime",
    dataIndex: "updateTime",
    /*defaultSortOrder: 'descend',*/
    sorter: (a, b) => a.updateTime - b.updateTime,

    scopedSlots: {customRender:"updateTime"}
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
</script>

<style scoped></style>
