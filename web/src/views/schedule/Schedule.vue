<template>
  <a-layout-content style="padding:24px;minHeight:280px ">
    <a-card>
      <a-form
        layout="horizontal"
        :label-col="{ flex: '50px' }"
        :wrapper-col="{ flex: 'auto' }"
      >
        <a-row :gutter="48">
          <a-col :sm="24" :md="6">
            <a-form-item label="状态：" style="display: flex">
              <a-select placeholder="请选择">
                <a-select-option value="active">
                  未激活
                </a-select-option>
                <a-select-option value="notActive">
                  已激活
                </a-select-option>
                <a-select-option value="standBy">
                  待调度
                </a-select-option>
                <a-select-option value="success">
                  成功
                </a-select-option>
                <a-select-option value="unusual">
                  异常
                </a-select-option>
                <a-select-option value="fail">
                  失败
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :md="6">
            <a-form-item label="类型：" style="display: flex">
              <a-select placeholder="请选择">
                <a-select-option value="orderService">
                  订单服务
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :md="6">
            <a-form-item label="名称：" style="display: flex">
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
        <a-modal
          title="新建任务"
          :visible="visible"
          :confirm-loading="confirmLoading"
          ok-text="确定"
          cancel-text="取消"
          @ok="handleOk"
          @cancel="handleCancel"
          footer=""
          width="900px"
        >
          <a-steps :current="current" style="margin: 0 auto 20px;width: 520px">
            <a-step
              v-for="item in steps"
              :key="item.title"
              :title="item.title"
            />
          </a-steps>
            <a-form
              layout="horizontal"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
            >
              <div class="form1" v-show="current === 0">
              <a-form-item label="任务类型">
                <a-col :span="18">
                  <a-select placeholder="请选择任务类型">
                    <a-select-option value="webService">
                      订单服务
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="4" offset="1">
                  <a>添加类型</a>
                </a-col>
              </a-form-item>
              <a-form-item label="任务名称">
                <a-input placeholder="请输入任务名称"> </a-input>
              </a-form-item>
              <a-form-item label="连接地址">
                <editor
                  v-decorator="[
                    'templateContent',
                    {
                      rules: [{ required: false, message: 's' }]
                    }
                  ]"
                  v-model="content"
                  @init="editorInit"
                  lang="java"
                  theme="chrome"
                  width="500"
                  height="300"
                >
                </editor>
                <a>
                  从模板添加
                </a>
              </a-form-item>
              <a-form-item label="失败通知">
                <a-input>
                  <a-select
                    slot="addonBefore"
                    default-value="关闭"
                    style="width: 90px"
                  >
                    <a-select-option value="关闭">
                      关闭
                    </a-select-option>
                    <a-select-option value="email">
                      邮箱
                    </a-select-option>
<!--                    <a-select-option value="手机">
                      手机
                    </a-select-option>
                    <a-select-option value="钉钉">
                      钉钉
                    </a-select-option>
                    <a-select-option value="微信">
                      微信
                    </a-select-option>-->
                  </a-select>
                </a-input>
              </a-form-item>
              <a-form-item label="备注信息">
                <a-textarea :rows="2" placeholder="请输入主机备注信息">
                </a-textarea>
              </a-form-item>
              </div>
              <div class="form2" v-show="current==1">
                <a-form-item label="执行对象">
                  <div v-for="(item,index) in new Array(1,2,3,4)" :key="index">
                    <a-select style="width: 80%;margin-right: 10px" placeholder="请选择" >
                      <a-select-option value="">
                        s
                      </a-select-option>
                    </a-select>
                    <a-icon class="minus-icon" type="minus-circle" style="font-size: 20px;">

                    </a-icon>
                  </div>

                </a-form-item>
              </div>
              <a-form-item :wrapper-col="{ offset: 6 }">
                <a-button
                  style="width: 200px"
                  :disabled="current < 2 ? false : true"
                  @click="
                    () => {
                      if (current < 2) current++;
                    }
                  "
                >
                  下一步
                </a-button>
                <a-button
                  style="width: 200px"
                  @click="
                    () => {
                      if (current > 0) current--;
                    }
                  "
                >
                  上一步
                </a-button>
              </a-form-item>
            </a-form>
        </a-modal>
      </div>
      <a-spin :spinning="spinning">
        <a-table :columns="columns" :data-source="data">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"> 任务名称</span>
          <span slot="updateTime" slot-scope="updateTime">{{
            Math.floor((Date.now() - updateTime) / 60000) + "分钟前"
          }}</span>
          <span slot="tags" slot-scope="tags">
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="
                tag == '成功' ? 'green' : tag == '失败' ? 'red' : 'blue'
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
            <a>详情</a>
            <a-divider type="vertical" />
            <a>编辑</a>
            <a-divider type="vertical" />
            <!--<a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>-->
            <a-dropdown :trigger="['click']">
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
            </a-dropdown>
          </span>
        </a-table>
      </a-spin>
    </a-card>
  </a-layout-content>
</template>

<script>
import {throttle} from "../../libs";
/*
import Template from "@/views/exec/Template";*/

export default {
  name: "Task",
  components: { /*Template，*/ editor: require("vue2-ace-editor") },
  data() {
    return {
      //表格 数据 字段
      data,
      columns,
      //按钮 刷新
      spinning: false,
      //按钮-新建
      visible: false,
      confirmLoading: false,
      //分页步骤
      current: 0,
      steps: [
        { title: "创建任务" },
        { title: "选择执行对象" },
        { title: "设置触发器" }
      ]
    };
  },
  methods: {
    //编辑器初始化
    editorInit: function() {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); //language
      require("brace/mode/java");
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
    },
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
      console.log("Clicked cancel button");
      this.visible = false;
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
  {
    key: "1",
    taskName: "检查支付状态",
    taskType: "订单服务",
    tags: ["成功"],
    updateTime: Date.now() - 60000,
    describe: ""
  },
  {
    key: "2",
    taskName: "关闭超时订单",
    taskType: "订单服务",
    tags: ["失败"],
    updateTime: Date.now() - 120000,
    describe: ""
  },
  {
    key: "3",
    taskName: "asdf",
    taskType: "待调度",
    tags: ["待调度"],
    updateTime: Date.now() - 120000,
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
    title: "任务类型",
    dataIndex: "taskType",
    key: "taskType"
  },
  {
    title: "最新状态",
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

    scopedSlots: { customRender: "updateTime" }
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

<style scoped>
.minus-icon:hover{
  color: #f80505;
  cursor: pointer;
}
</style>
