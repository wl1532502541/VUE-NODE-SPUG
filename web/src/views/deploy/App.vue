<template>
  <a-layout-content style="padding:24px 24px 0;">
    <a-card>
      <a-form
        layout="horizontal"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-row :gutter="48">
          <a-col :sm="24" :md="8">
            <a-form-item label="模板类型：">
              <a-select placeholder="请选择"> </a-select>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :md="8">
            <a-form-item label="模板名称：">
              <a-input placeholder="请输入"> </a-input>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :md="6">
            <a-form-item>
              <a-button type="primary" @click="clickRefresh">
                <a-icon type="sync"></a-icon>
                刷新
              </a-button></a-form-item
            >
          </a-col>
        </a-row>
      </a-form>
      <div style="margin: 0 0 16px">
        <a-button type="primary" @click="setVisible(newApp, true)">
          <a-icon type="plus"></a-icon>
          新建
        </a-button>
        <a-modal
          ref="collectionForm"
          title="新建模板"
          :visible="newApp.visible"
          :confirm-loading="newApp.confirmLoading"
          ok-text="确定"
          cancel-text="取消"
          @ok="handleOkForm"
          @cancel="setVisible(newApp, false)"
          width="800px"
        >
          <a-form
            layout="horizontal"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 14 }"
            :form="newForm"
            @submit="handleOkForm"
          >
            <a-form-item label="应用名称：">
              <a-row>
                <a-input
                  placeholder="请输入应用名称，例如：订单服务"
                  v-decorator="[
                    'templateType',
                    {
                      rules: [
                        {
                          required: true,
                          message: ''
                        }
                      ]
                    }
                  ]"
                >
                </a-input>
              </a-row>
            </a-form-item>
            <a-form-item label="唯一标识符：">
              <a-input
                placeholder="请输入唯一标识符，例如： api_order"
                v-decorator="[
                  'templateNew',
                  {
                    rules: [{ required: true, message: '' }]
                  }
                ]"
              >
              </a-input>
            </a-form-item>
            <a-form-item label="备注信息">
              <a-textarea
                  v-decorator="[
                  'remarks',
                  {
                    rules: [{ required: false, message: '' }]
                  }
                ]"
                placeholder="请输入备注信息"
                :autoSize="{ minRows: 1,maxRows: 50 }"
              />
            </a-form-item>

          </a-form>
          <template slot="footer">
            <a-button key="back" @click="handleCancel">
              Return
            </a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
              Submit
            </a-button>
          </template>
        </a-modal>
      </div>
      <a-spin :spinning="spinning">
        <a-table :columns="columns" :data-source="data">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"> 排序</span>
          <span slot="tags" slot-scope="tags">
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="
                tag == '成功' ? 'green' : 'red'
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
            <a-button type="link">新建发布</a-button>
            <a-divider type="vertical" />
            <a-button type="link">克隆发布</a-button>
            <a-divider type="vertical" />
            <a-button type="link">编辑</a-button>
            <a-divider type="vertical" />
            <a-button type="link">删除</a-button>
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
  name: "App",
  data() {
    return {
      //刷新ing
      spinning: false,
      data,
      columns,
      //新建模板按钮状态
      newApp: {
        visible: false,
        confirmLoading: false
      },
      //新建模板表单绑定
      newForm: this.$form.createForm(this, "newApp"),
      templateNew:''
    };
  },
  methods: {
    setVisible(obj, boolean) {
      obj.visible = boolean;
    },
    handleOk(obj) {
      obj.confirmLoading = true;
      setTimeout(() => {
        obj.visible = false;
        obj.confirmLoading = false;
      }, 100);
    },
    clickRefresh: function() {
      console.log("2");
      this.spinning = !this.spinning;
      let that = this;
      let fn = setTimeout(function() {
        that.spinning = !that.spinning;
      }, 500);
      console.log("pre");
      throttle(fn, 5000)();
      console.log("after");
    },
    handleOkForm(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          console.log(this.templateNew+'s')
          this.newApp.confirmLoading = true;

          this.form.resetFields({
            templateNew:'123'
          })
          setTimeout(() => {
            this.newApp.visible = false;
            this.newApp.confirmLoading = false;
          }, 200);
        }
      });
    }
  }
};

const data = [
  /*  {
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
  }*/
  {
    key: "1",
    appName: "订单服务",
    appIdentifier: "order",
    appDescribe: "订单创建支付等订单相关功能"
  }
];
const columns = [
  {
    dataIndex: "templateName",
    key: "templateName",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "templateName" }
  },
  {
    title: "应用名称",
    dataIndex: "appName",
    key: "appName"
  },
  {
    title: "标识符",
    key: "appIdentifier",
    dataIndex: "appIdentifier",
    scopedSlots: { customRender: "contents" }
  },
  {
    title: "描述信息",
    key: "appDescribe",
    dataIndex: "appDescribe"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
</script>

<style scoped></style>
