<template>
  <a-card>
    <a-form
        layout="horizontal"
        :label-col="{ flex:'50px'  }"
        :wrapper-col="{ flex:'auto' }"
    >
      <a-row :gutter="12">
        <a-col :sm="24" :md="6">
          <a-form-item label="姓名：" style="display: flex">
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
      <a-button type="primary" @click="showModal">
        <a-icon type="plus"></a-icon>
        新建
      </a-button>
      <a-modal title="新建联系人" :visible="visible" :confirm-loading="confirmLoading" ok-text="确定" cancel-text="取消"
                @ok="handleOk"
                @cancel="handleCancel">

      </a-modal>
    </div>
    <a-spin :spinning="spinning">
      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"> 序号</span>
        <span slot="updateTime" slot-scope="updateTime">{{ Math.floor((Date.now()-updateTime)/60000) +"分钟前" }}</span>
        <span slot="tags" slot-scope="tags">
          <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="
              tag == '成功' ? 'green' : tag=='失败' ? 'red':'blue'
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
          <a>编辑</a>
          <a-divider type="vertical" />
          <a>删除</a>
          <a-divider type="vertical" />
          <!--<a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>-->
<!--            <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              更多 <a-icon type="down" />
            </a>
          </a-dropdown>-->
        </span>
      </a-table>
    </a-spin>
  </a-card>
</template>

<script>
import {throttle} from "../../libs";

export default {
  name: "Contact",
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
    name: "诸葛",
    phone: "123321123",
    email: '23322323@163.com',
    dd: '22222222',
    vx: "11111111"
  },
  {
    key: "2",
    name: "刘备",
    phone: "32112321",
    email: '23322323@163.com',
    dd: '22222222',
    vx: "11111111"
  },
  {
    key: "3",
    name: "张飞",
    phone: "3212132",
    email: '23322323@163.com',
    dd: '22222222',
    vx: "11111111"
  }
];
const columns = [
  {
    dataIndex: "key",
    key: "key",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "key",}
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "手机号",
    key: "phone",
    dataIndex: "phone",
  },
  {
    title: "邮箱",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "钉钉",
    key: "dd",
    dataIndex: "dd",
  },
  {
    title: "微信",
    key: "vx",
    dataIndex: "vx"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
</script>

<style scoped></style>
