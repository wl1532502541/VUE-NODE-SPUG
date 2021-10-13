<template>
  <a-card>
    <a-form
        layout="horizontal"
        :label-col="{ flex:'60px'  }"
        :wrapper-col="{ flex:'auto' }"
    >
      <a-row :gutter="12">
        <a-col :sm="24" :md="6">
          <a-form-item label="组名称：" style="display: flex">
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
      <a-modal title="新建联系组" :visible="visible" :confirm-loading="confirmLoading" ok-text="确定" cancel-text="取消"
                @ok="handleOk"
                @cancel="handleCancel" width="800px">
        <a-form
            layout="horizontal"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 14 }"
            :form="newGroupForm"
        >
          <a-form-item label="组名称">
            <a-input v-decorator="['groupName',{rules:[{required:true}]}]"  placeholder="请输入联系组名称">

            </a-input>
          </a-form-item>
          <a-form-item label="备注信息">
            <a-textarea v-decorator="['remarks']" :rows="2" placeholder="请输入模板备注信息">

            </a-textarea>
          </a-form-item>
          <a-form-item label="选择联系人">
            <a-transfer
                :data-source="sourceData"
                :titles="['已有联系人', '已选联系人']"
                :target-keys="targetKeys"
                :selected-keys="selectedKeys"
                :render="item => item.title"
                @change="handleChange"
                @selectChange="handleSelectChange"
                @scroll="handleScroll"
            />
          </a-form-item>
        </a-form>
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
  name: "Group",
  data() {
    const mockData = [];
    /*for (let i = 0; i < 20; i++) {
      mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`
      });
    }*/
    mockData.push({
      key: "0",
      title: "运维值班",
      description: `description of 运维值班`
    })

    const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
    return {
      //表格 数据 字段
      data,
      columns,
      //按钮 刷新
      spinning: false,
      //按钮-新建
      visible:false,
      confirmLoading:false,
      //表格 新建联系人表
      newGroupForm:this.$form.createForm(this,{name:'newGroup'}),
      sourceData:mockData,
      targetKeys: oriTargetKeys,
      /*selectedKeys: ['1', '4'],*/
      selectedKeys:[],
      disabled: false,
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
    },
    //穿梭框
    handleChange(nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys;

      console.log('targetKeys: ', nextTargetKeys);
      console.log('direction: ', direction);
      console.log('moveKeys: ', moveKeys);
    },
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];

      console.log('sourceSelectedKeys: ', sourceSelectedKeys);
      console.log('targetSelectedKeys: ', targetSelectedKeys);
    },
    handleScroll(direction, e) {
      console.log('direction:', direction);
      console.log('target:', e.target);
    }
  }
};
const data = [
  {
    key: "1",
    groupName: "三国",
    member: "诸葛，张飞，刘备",
    describe: "暂无"
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
    title: "组名称",
    dataIndex: "groupName",
    key: "groupName"
  },
  {
    title: "成员",
    key: "member",
    dataIndex: "member",
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
