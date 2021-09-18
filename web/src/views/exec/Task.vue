<template>
  <a-layout-content style="padding:24px 24px 0;">
    <a-card>
      <a-form layout="horizontal">
        <a-form-item label="执行主机"> </a-form-item>
        <a-button plus @click="setVisible(host, true)">
          <a-icon type="plus"></a-icon>
          从主机列表中选择
        </a-button>
        <a-modal
          title="选择执行主机"
          :visible="host.visible"
          :confirm-loading="host.confirmLoading"
          ok-text="确定"
          cancel-text="取消"
          @ok="handleOk(host)"
          @cancel="setVisible(host, false)"
          width="1000px"
        >
          <a-form
            layout="horizontal"
            :label-col="{flex:'75px'}"
            :wrapper-col="{ flex:'auto' }"
          >
            <a-row :gutter="12">
              <a-col :sm="24" :md="6">
                <a-form-item label="主机类别：" style="display: flex">
                  <a-select placeholder="请选择"> </a-select>
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="6">
                <a-form-item label="主机别名：" style="display: flex">
                  <a-input placeholder="请输入"> </a-input>
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="6">
                <a-form-item label="已选" style="display:flex" :wrapper-col="{offset:2}">
                  台
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="6">
                <a-form-item>
                  <a-button type="primary" @click="clickRefresh">
                    <a-icon type="sync"></a-icon>
                    刷新
                  </a-button></a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-spin :spinning="spinning">
          <a-table
            :row-selection="{ selectedRowKeys: hselectedRowKeys, onChange: honSelectChange }"
            :columns="hcolumns"
            :data-source="hdata"
          ></a-table>
          </a-spin>
        </a-modal>
        <a-form-item label="执行命令：">
          <editor
            v-model="content"
            @init="editorInit"
            lang="html"
            theme="chrome"
            width="500"
            height="300"
          ></editor>
        </a-form-item>
        <a-form-item>
          <a-button plus @click="setVisible(template, true)">
            <a-icon type="plus"></a-icon>
            从执行模板中选择
          </a-button></a-form-item
        >
        <a-modal
          title="选择执行模板"
          :visible="template.visible"
          :confirm-loading="template.confirmLoading"
          ok-text="确定"
          cancel-text="取消"
          @ok="handleOk(template)"
          @cancel="setVisible(template, false)"
          width="1000px"
        >
          <a-form
            layout="horizontal"
            :label-col="{flex:'75px'}"
            :wrapper-col="{ flex:'auto' }"
          >
            <a-row :gutter="12">
              <a-col :sm="24" :md="8">
                <a-form-item label="模板类别：" style="display: flex">
                  <a-select placeholder="请选择"> </a-select>
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="8">
                <a-form-item label="模板名称：" style="display: flex">
                  <a-input placeholder="请输入"> </a-input>
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="8">
                <a-form-item>
                  <a-button type="primary" @click="clickRefresh">
                    <a-icon type="sync"></a-icon>
                    刷新
                  </a-button></a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-spin :spinning="spinning">
            <a-table
              :row-selection="{ selectedRowKeys: tselectedRowKeys, onChange: tonSelectChange }"
              :columns="tcolumns"
              :data-source="tdata"
            ></a-table>
          </a-spin>
        </a-modal>
        <a-form-item>
          <a-button type="primary">
            <a-icon type="thunderbolt"></a-icon>
            开始执行
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </a-layout-content>
</template>

<script>
import {throttle} from "@/libs";

const hcolumns = [
  {
    title: '类别',
    dataIndex: 'type',
  },
  {
    title: '主机名称',
    dataIndex: 'hostName',
  },
  {
    title: '连接地址',
    dataIndex: 'hostLocation',
  },
  {
    title:'端口',
    dataIndex: 'port',
  },
  {
    title: '备注',
    dataIndex: 'remarks'
  }
];
const tcolumns =[
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '名称',
    dataIndex: 'templateName',
  },
  {
    title: '内容',
    dataIndex: 'templateContent',
  },
  {
    title: '备注',
    dataIndex: 'remarks'
  }
]

const hdata = [
  {
    type:'Web服务',
    hostName:'web-01',
    hostLocation:'10.7.117.181',
    port:'2201'
  }
];
const tdata = [
  {
    type:'sss',
    templateName:'dddd',
    templateContent:'ls ls -l ls -rt',
    remarks:'ss'
  }
];
export default {
  name: "Task",
  components: {
    editor: require("vue2-ace-editor")
  },/*
  computed: {
    hasSelected() {
      return this.hselectedRowKeys.length > 0;
    },
  },*/
  methods: {
    editorInit: function() {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); //language
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
    },
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
    /*hstart() {
      this.hloading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.hloading = false;
        this.hselectedRowKeys = [];
      }, 1000);
    },*/
    honSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.hselectedRowKeys = selectedRowKeys;
    },
    tonSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.tselectedRowKeys = selectedRowKeys;
    },
    //刷新按钮函数
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
  },
  data() {
    return {
      host: {
        visible: false,
        confirmLoading: false
      },
      template: {
        visible: false,
        confirmLoading: false
      },
      //按钮 刷新
      spinning: false,
      //选择执行主机里的表格
      hdata,
      hcolumns,
      hselectedRowKeys: [], // Check here to configure the default column
      hloading: false,
      tdata,
      tcolumns,
      tselectedRowKeys: [], // Check here to configure the default column
      tloading: false,
    };
  }
};

</script>

<style scoped>
a-form-item {
  margin: 0 0 24px;
}
</style>
