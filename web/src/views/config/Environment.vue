<template>
  <a-layout-content style="padding:24px;minHeight:280px ">
    <a-card>
      <a-row type="flex">
        <a-col flex="100px" >
          <div style="background-color: black">s</div>
        </a-col>
        <a-col flex="auto" >
          <div style="background-color: greenyellow">s</div>
        </a-col>

      </a-row>
      <a-form
          layout="horizontal"
          :label-col="{flex:'100px'}"
          :wrapper-col="{flex:'auto'}"
      >
        <a-row :gutter="48" >
          <a-col :sm="24" :md="6">
            <a-form-item label="主机类别：" style="display: flex">
<!--              <a-row type="flex">-->
              <a-select placeholder="请选择">
                <a-select-option value="1">
                  1
                </a-select-option>
                <a-select-option value="2">
                  Web服务
                </a-select-option>
              </a-select>
<!--              </a-row>-->
            </a-form-item>
          </a-col>

          <a-col :sm="24" :md="6">
            <a-form-item label="主机别名：">
              <a-input placeholder="请输入">

              </a-input>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :md="6">
            <a-form-item label="连接地址：">
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
      <div style="margin: 0 0 16px">
        <a-button type="primary" @click="setVisible(newHost,true)">
          <a-icon type="plus"></a-icon>
          新建
        </a-button>
        <a-modal
            title="新建模板"
            :visible="newHost.visible"
            :confirm-loading="newHost.confirmLoading"
            ok-text="确定"
            cancel-text="取消"
            @ok="handleOk(newHost)"
            @cancel="setVisible(newHost,false)"
            width="800px"
        >
          s
        </a-modal>
        <a-button type="primary" @click="setVisible(importHost,true)" style="margin-left:20px ">
          <a-icon type="import"></a-icon>
          批量导入
        </a-button>
        <a-modal
            title="新建模板"
            :visible="importHost.visible"
            :confirm-loading="importHost.confirmLoading"
            ok-text="确定"
            cancel-text="取消"
            @ok="handleOk(importHost)"
            @cancel="setVisible(importHost,false)"
            width="800px"
        >
          s
        </a-modal>
      </div>
      <a-spin :spinning="spinning">
        <a-table :columns="columns" :data-source="data">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"> 类别</span>
          <span slot="action">
            <a>编辑</a>
            <a-divider type="vertical" />
            <a>删除</a>
            <a-divider type="vertical" />
            <a>Console</a>
            <a-divider type="vertical" />
          </span>
        </a-table>
      </a-spin>
    </a-card>
  </a-layout-content>
</template>

<script>
import {throttle} from "@/libs";

export default {
  name: "Environment",
  components: {},
  data() {
    return {
      data,
      columns,
      newHost:{
        visible:false,
        confirmLoading:false
      },
      importHost:{
        visible:false,
        confirmLoading:false
      },
      //按钮 刷新
      spinning: false,
    };
  },
  methods: {
    setVisible(obj,boolean){
      obj.visible=boolean;
    },
    handleOk(obj){
      obj.confirmLoading=true;
      setTimeout(()=>{
        obj.visible=false;
        obj.confirmLoading=false;
      },100);
    },
    //刷新按钮
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
const data = [/*
  {
    key: "1",
    taskName: "检查支付状态",
    taskType: "订单服务",
    tags: ["成功"],
    updateTime: "3分钟前",
    describe: ""
  },
  {
    key: "2",
    taskName: "关闭超时订单",
    taskType: "订单服务",
    tags: ["失败"],
    updateTime: "3分钟前",
    describe: ""
  }*/{
  key: "1",
  hostType:'Web服务',
  hostName:'web-01123',
  hostLocation: '10.7.117.181',
  hostPort: '2201',
  hostRemarks: ''
}
];
const columns = [
  {
    dataIndex: "hostType",
    key: "hostType",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "hostType" }
  },
  {
    title: "主机名称",
    dataIndex: "hostName",
    key: "hostName",
    sorter: (a, b) => a.hostName-b.hostName,
  },
  {
    title: "连接地址",
    key: "hostLocation",
    dataIndex: "hostLocation",
    /*defaultSortOrder: 'descend',*/
    sorter: (a, b) => a.location - b.location,
    scopedSlots: { customRender: "hostLocation" }
  },
  {
    title: "端口",
    key: "hostPort",
    dataIndex: "hostPort",
  },
  {
    title: "备注信息",
    key: "hostRemarks",
    dataIndex: "hostRemarks"
  },
  {
    title: "操作",
    key: "hostAction",
    scopedSlots: { customRender: "action" }
  }
];
</script>

<style>
.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
.ant-advanced-search-form .ant-form-item {
  display: flex;
}
.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
