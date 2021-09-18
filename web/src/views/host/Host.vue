<template>
  <a-layout-content style="padding: 24px; minheight: 280px">
    <a-card>
      <SearchForm>
        <SearchFormItem :md="6" label="主机类别">
          <a-select placeholder="请选择" @change="(val) => this.$store.state.host.f_type = val" allowClear>
            <a-select-option
              v-for="(item, index) in types"
              :key="index"
              :value="item"
              >{{ item }}</a-select-option
            >
          </a-select>
        </SearchFormItem>
        <SearchFormItem :md="6" label="主机别名：">
          <a-input placeholder="请输入" @change="(e)=>this.$store.state.host.f_hostName = e.target.value"></a-input>
        </SearchFormItem>
        <SearchFormItem :md="6" label="连接地址：">
          <a-input placeholder="请输入" @change="(e)=>this.$store.state.host.f_ip = e.target.value"> </a-input>
        </SearchFormItem>
        <SearchFormItem :md="6">
          <a-button type="primary" @click="clickRefresh">
            <a-icon type="sync"></a-icon>刷新
          </a-button>
        </SearchFormItem>
      </SearchForm>
      <div style="margin: 0 0 16px">
        <a-button type="primary" @click="showForm()">
          <a-icon type="plus"></a-icon>
          新建
        </a-button>
        <Form />
      </div>
      <a-spin :spinning="isFetching">
        <a-table :columns="columns" :data-source="data" rowKey="id" tableLayout="fixed">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"> 类别</span>
          <span slot="action" slot-scope="record">
            <a @click="showForm(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleDelete(record)">删除</a>
            <a-divider type="vertical" />
            <a @click="handleConsole(record)">Console</a>
            <a-divider type="vertical" />
          </span>
        </a-table>
      </a-spin>
    </a-card>
  </a-layout-content>
</template>

<script>
import SearchForm from "../../components/searchForm/SearchForm.vue";
import SearchFormItem from "../../components/searchForm/SearchFormItem.vue";
import Form from "./components/Form.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "Host",
  components: { SearchForm, SearchFormItem, Form },
  created() {
    this._fetchRecords();
  },
  data() {
    return {
      columns,
    };
  },
  computed: {
    ...mapState("host", [
      "isFetching",
      "records",
      "types",
      "f_type",
      "f_hostName",
      "f_ip",
    ]),
    data() {
      let data = this.records.map((item) =>item);
      if (this.f_type) {
        data = data.filter((item) =>
          item["type"].toLowerCase().includes(this.f_type.toLowerCase())
        );
      }
      if (this.f_hostName) {
        data = data.filter((item) =>
          item["hostName"].toLowerCase().includes(this.f_hostName.toLowerCase())
        );
      }
      if (this.f_ip) {
        data = data.filter((item) =>
          item["ip"].toLowerCase().includes(this.f_ip.toLowerCase())
        );
      }
      return data;
    },
  },
  methods: {
    ...mapMutations("host", ["showForm"]),
    ...mapActions("host",["_fetchRecords","_delHost"]),
    //刷新按钮
    clickRefresh: function() {
      this._fetchRecords();
    },
    //上传确定按钮
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    //删除按钮
    handleDelete(text) {
      this.$confirm({
        title: "删除确认",
        content:h => <div style="color:red;">删除不可撤回，确定要删除【{text["hostName"]}】？</div>,
        onOk: () => {
          this._delHost({params:{id:text.id}})
        },
      });
    },
    //Console按钮
    handleConsole(record){
      window.open(`/ssh/${record.id}`)
    }
  },
};
/*let data = [
  {
    key: "1",
    hostType: "Web服务",
    hostName: "web-01123",
    hostLocation: "10.7.117.181",
    hostPort: "2201",
    hostRemarks: ""
  }
];*/
const columns = [
  {
    dataIndex: "type",
    key: "type",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "type" },
  },
  {
    title: "主机名称",
    dataIndex: "hostName",
    key: "hostName",
    sorter: (a, b) => a.hostName - b.hostName,
  },
  {
    title: "连接地址",
    key: "ip",
    dataIndex: "ip",
    /*defaultSortOrder: 'descend',*/
    sorter: (a, b) => a.ip - b.ip,
    scopedSlots: { customRender: "ip" },
  },
  {
    title: "端口",
    key: "port",
    dataIndex: "port",
  },
  {
    title: "备注信息",
    key: "remarks",
    dataIndex: "remarks",
  },
  {
    title: "操作",
    key: "hostAction",
    scopedSlots: { customRender: "action" },
  },
];
</script>

<style scoped>
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
