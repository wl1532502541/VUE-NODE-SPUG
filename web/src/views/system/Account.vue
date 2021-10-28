<template>
  <a-card>
    <SearchForm>
      <SearchFormItem :md="8" label="账户名称：">
        <a-input placeholder="请输入" @change="" allowClear />
      </SearchFormItem>
      <SearchFormItem :md="8" label="账户状态：">
        <a-select placeholder="请选择" @change="" allowClear>
          <a-select-option :value="true">
            正常
          </a-select-option>
          <a-select-option :value="false">
            禁用
          </a-select-option>
        </a-select>
      </SearchFormItem>
      <SearchFormItem :md="6">
        <a-button type="primary" @click="clickRefresh">
          <a-icon type="sync"></a-icon>刷新
        </a-button>
      </SearchFormItem>
    </SearchForm>
    <div style="margin: 0 0 16px">
      <a-button type="primary" @click="setVisible(newAccount,true)" icon="plus">
        新建
      </a-button>
      <a-modal title="新建账户" :visible="newAccount.visible" :confirm-loading="newAccount.confirmLoading" ok-text="确定" cancel-text="取消" @ok="handleOk(newAccount)" @cancel="setVisible(newAccount,false)" width="800px">
        s
      </a-modal>
    </div>
    <a-spin :spinning="spinning">
      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"> 类别</span>
        <span slot="action">
          <a @click="showDisable">禁用</a>
          <a-divider type="vertical" />
          <a>编辑</a>
          <a-divider type="vertical" />
          <a @click="showResetPwd">重置密码</a>
          <a-divider type="vertical" />
          <a @click="showDelete">删除</a>
          <a-divider type="vertical" />
        </span>
      </a-table>
    </a-spin>
  </a-card>
</template>

<script>
// import { throttle } from "@/libs";
import SearchForm from "../../components/searchForm/SearchForm.vue";
import SearchFormItem from "../../components/searchForm/SearchFormItem.vue";

export default {
  name: "Account",
  components: { SearchForm, SearchFormItem },
  data () {
    return {
      data,
      columns,
      newAccount: {
        visible: false,
        confirmLoading: false
      },
      //按钮 刷新
      spinning: false,
      //表单 密码
      formResetPwd: this.$form.createForm(this, 'formResetPwd')
    };
  },
  methods: {
    setVisible (obj, boolean) {
      obj.visible = boolean;
    },
    handleOk (obj) {
      obj.confirmLoading = true;
      setTimeout(() => {
        obj.visible = false;
        obj.confirmLoading = false;
      }, 100);
    },
    //刷新按钮
    clickRefresh: function () {
      console.log("2");
      this.spinning = !this.spinning;
      let that = this;
      let fn = setTimeout(function () {
        that.spinning = !that.spinning;
      }, 500);
      console.log('pre')
      throttle(fn, 5000)()
      console.log('after')
    },
    //禁用对话框
    showDisable: function () {
      this.$confirm({
        title: '操作确认',
        content: h => <div style="color:red;">确定要禁用 ？</div>,
        onOk () {
          console.log('确定');
        },
        onCancel () {
          console.log('取消');
        },
        class: 'test',
      });
    },
    //删除对话框
    showDelete: function () {
      this.$confirm({
        title: '删除确认',
        content: h => <div style="color:red;">确定要删除 ？</div>,
        onOk () {
          console.log('确定');
        },
        onCancel () {
          console.log('取消');
        },
        class: 'test',
      });
    },
    //重置密码对话框
    showResetPwd: function () {
      this.$warning({
        title: '重置登录密码',
        content: h => <div></div> /*<a-form layout="horizontal" :form=this.formResetPwd>
          <a-form-item label="重置后的新密码：">
            <a-input v-decorator="[
                      'templateType',
                      {
                        rules: [
                          {
                            required: true,
                            message: 'Please select your gender!'
                          }
                        ]
                      }
                    ]">

            </a-input>
          </a-form-item>
        </a-form>*/
        ,
        onOk () { },
      });
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
    hostType: 'Web服务',
    hostName: 'web-01123',
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
    sorter: (a, b) => a.hostName - b.hostName,
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
