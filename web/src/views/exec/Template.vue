<template>
  <a-layout-content style="padding:24px 24px 0;minHeight:280px ">
    <a-card>
      <a-form
        layout="horizontal"
        :label-col="{flex:'75px'}"
        :wrapper-col="{ flex:'auto' }"
      >
        <a-row :gutter="48">
          <a-col :sm="24" :md="8">
            <a-form-item label="模板类型：" style="display: flex">
              <a-select placeholder="请选择"> </a-select>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :md="8">
            <a-form-item label="模板名称：" style="display: flex">
              <a-input placeholder="请输入"> </a-input>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :md="6">
            <a-form-item>
              <a-button type="primary" @click="clickRefresh">
                <a-icon type="sync"></a-icon>刷新
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div style="margin: 0 0 16px">
        <a-button type="primary" @click="setVisible(newTemplate,true)">
          <a-icon type="plus"></a-icon>
          新建
        </a-button>
        <a-modal ref="collectionForm"
          title="新建模板"
          :visible="newTemplate.visible"
          :confirm-loading="confirmLoading"
          ok-text="确定"
          cancel-text="取消"
          @ok="handleOk(newTemplate)"
          @cancel="handleCancel(newTemplate)"
          width="800px"
        >
          <a-form
            layout="horizontal"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 14 }"
            :form="form"
          >
            <a-form-item label="模板类型：">
              <a-row>
                <a-col span="16">
                  <a-select
                    placeholder="请选择模板类型"
                    v-decorator="[
                      'templateType',
                      {
                        rules: [
                          {
                            required: templateCount?true:false,
                            message: 'Please select your gender!'
                          }
                        ]
                      }
                    ]"
                  >

                  </a-select>
                </a-col>
                <a-col span="6" offset="2">
                  <a-button type="link">
                    添加类型
                  </a-button></a-col>
              </a-row>
            </a-form-item>
            <a-form-item label="模板名称：">
              <a-input
                placeholder="请输入模板名称"
                v-decorator="[
                  'templateNew',
                  {
                    rules: [{ required: true, message: '' }]
                  }
                ]"
              >
              </a-input>
            </a-form-item>
            <a-form-item label="模板内容："  >
              <editor  v-decorator="[
                  'templateContent',
                  {
                    rules: [{ required: false, message: 's' }]
                  }
                ]" v-model="content"  @init="editorInit" lang="java" theme="chrome" width="500" height="300">
              </editor>
            </a-form-item>
            <a-form-item label="备注信息">
              <a-textarea
                  v-model="remarks"
                  placeholder="请输入备注信息"
                  :rows="2"
              />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
      <a-spin :spinning="spinning">
        <a-table :columns="columns" :data-source="data">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"> 任务名称</span>
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
            <a @click="showModal()">编辑</a>
            <a-modal ref="collectionForm"
                     title="新建模板"
                     :visible="visible"
                     :confirm-loading="confirmLoading"
                     ok-text="确定"
                     cancel-text="取消"
                     @ok="handleOk"
                     @cancel="handleCancel"
                     width="800px"
            >
          <a-form
              layout="horizontal"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 14 }"
              :form="form"
          >
            <a-form-item label="模板类型：">
              <a-row>
                <a-col span="16">
                  <a-select
                      placeholder="请选择模板类型"
                      v-decorator="[
                      'templateType',
                      {
                        rules: [
                          {
                            required: templateCount?true:false,
                            message: 'Please select your gender!'
                          }
                        ]
                      }
                    ]"
                  >

                  </a-select>
                </a-col>
                <a-col span="6" offset="2">
                  <a-button type="link">
                    添加类型
                  </a-button></a-col>
              </a-row>
            </a-form-item>
            <a-form-item label="模板名称：">
              <a-input
                  placeholder="请输入模板名称"
                  v-decorator="[
                  'templateNew',
                  {
                    rules: [{ required: true, message: '' }]
                  }
                ]"
              >
              </a-input>
            </a-form-item>
            <a-form-item label="模板内容："  >
              <editor  v-decorator="[
                  'templateContent',
                  {
                    rules: [{ required: false, message: 's' }]
                  }
                ]" v-model="content"  @init="editorInit" lang="java" theme="chrome" width="500" height="300">
              </editor>
            </a-form-item>
            <a-form-item label="备注信息">
              <a-textarea
                  v-model="remarks"
                  placeholder="请输入备注信息"
                  :rows="2"
              />
            </a-form-item>
          </a-form>
        </a-modal>
            <a-divider type="vertical" />
            <a>删除</a>
            <a-divider type="vertical" />
            <!--<a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>-->

          </span>
        </a-table>
      </a-spin>
    </a-card>
  </a-layout-content>
</template>

<script>
import {throttle} from "@/libs";

export default {
  name: "Template",
  components: {
    editor: require('vue2-ace-editor')
  },
  data() {
    return {
      //表格 数据 字段
      form: this.$form.createForm(this, { name: "newTemplate" }),
      data,
      columns,
      //按钮 刷新
      spinning: false,
      //按钮-新建
      newTemplate: {
        visible: false,
        confirmLoading: false
      },
      //按钮-编辑
      setTemplate:{
        visible: false,
        confirmLoading: false
      }
    };
  },
  methods: {
    editorInit: function () {
      require('brace/ext/language_tools') //language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript')    //language
      require('brace/mode/java')
      require('brace/mode/less')
      require('brace/theme/chrome')
      require('brace/snippets/javascript') //snippet
    },
    showModal(obj) {
      obj.visible = true;
    },
    handleOk(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });/*
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 200);*/
    },
    handleCancel(obj) {
      console.log("Clicked cancel button");
      obj.visible = false;
    },
    setVisible(obj, boolean) {
      obj.visible=boolean
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
    key: '1',
    templateName:'test111',
    templateType:'tes1',
    content:'select * from job',
    describe:'测试'

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
    title: "模板类型",
    dataIndex: "templateType",
    key: "templateType"
  },
  {
    title: "模板内容",
    key: "content",
    dataIndex: "content",
    scopedSlots: { customRender: "contents" }
  },
  {
    title: "描述信息",
    key: "describe",
    dataIndex: "describe"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
</script>

<style scoped></style>
