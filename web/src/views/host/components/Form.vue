<template>
  <a-modal :title="record._id ? '编辑主机' : '新建主机'" :visible="formVisible" :confirm-loading="loading" ok-text="确定" cancel-text="取消" @ok="handleSubmit()" @cancel="handleCloseForm()" width="800px" :maskClosable="false">
    <a-form layout="horizontal" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :form="form">
      <a-form-item label="主机类别">
        <a-col :span="14">
          <a-select placeholder="请选择主机类别/区域/分组" v-decorator="[
              'type',
              { rules: [{ required: true }], initialValue: record.type },
            ]">
            <a-select-option v-for="(item,index) in types" :key="index" :value="item">{{item}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4" offset="1">
          <a-button type="link" @click="handleAddZone()">添加类别</a-button>
        </a-col>
        <a-col :span="4" offset="1">
          <a-button type="link" @click="handleEditZone()">编辑类别</a-button>
        </a-col>
      </a-form-item>
      <a-form-item label="主机名称">
        <a-input placeholder="请输入主机名称" v-decorator="[
            'hostname',
            { rules: [{ required: true }], initialValue: record.hostname },
          ]">
        </a-input>
      </a-form-item>
      <a-form-item required label="连接地址" style="margin-bottom: 0">
        <a-form-item style="display: inline-block; width: 30%">
          <a-input v-decorator="[
              'username',
              { rules: [{ required: true }], initialValue: record.username },
            ]" addon-before="ssh" placeholder="用户名">
          </a-input>
        </a-form-item>
        <a-form-item style="display: inline-block; width: 40%">
          <a-input v-decorator="[
              'ip',
              { rules: [{ required: true ,pattern:/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,message:'required，注意格式'}], initialValue: record.ip },
            ]" addon-before="@" placeholder="主机名/IP">
          </a-input>
        </a-form-item>
        <a-form-item style="display: inline-block; width: 30%">
          <a-input v-decorator="[
              'port',
              { rules: [{ required: true ,pattern:/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,message:'0-65535'}], initialValue: record.port },
            ]" addon-before="-p" placeholder="端口">
          </a-input>
        </a-form-item>
      </a-form-item>
      <a-form-item label="独立密钥" extra="默认使用全局密钥，如果上传了独立密钥则优先使用该密钥。">
        <a-upload name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleUploadChange">
          <a-button>
            <a-icon type="upload" /> 点击上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="备注信息">
        <a-textarea v-decorator="['desc',{initialValue: record.desc }]" :rows="2" placeholder="请输入主机备注信息">
        </a-textarea>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 4 }">
        <span>
          ⚠️ 首次验证时需要输入登录用户名对应的密码，但不会存储该密码。
        </span>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { insertOrUpdateHost } from "@/api/host";
// import http from "../../../libs/http";
export default {
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this, { name: "form" }),
      addZone: null,
      fileList: [],
    };
  },
  computed: {
    ...mapState("host", ["formVisible", "record", "zones", "types"]),
  },
  methods: {
    ...mapMutations("host", ["closeForm"]),
    ...mapActions("host", ["_getHosts"]),
    handleSubmit () {
      let message = this.$message;
      this.loading = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          // const formData = this.form.getFieldsValue();
          const formData = values;
          const file = this.fileList[0];
          if (file && file.data) formData["pkey"] = file.data;
          insertOrUpdateHost(this.record._id, formData).then(
            (res) => {
              console.log("insertOrUpdateHost res", res);
              if (res === "auth fail") {
                if (formData.pkey) {
                  message.error("独立密钥认证失败");
                } else {
                  // this.loading=false
                  Modal.confirm({
                    icon: "exclamation-circle",
                    title: "首次验证请输入密码",
                    content: this.confirmForm(formData.username),
                    onOk: () => this.handleConfirm(formData),
                  });
                }
              } else {
                message.success("操作成功");
                this._getHosts();
                this.closeForm(() => this.form.resetFields());
              }
            },
            (error) => {
              message.error(error);
            }
          );
        }
      });
      this.loading = false;
    },
    handleCloseForm () {
      this.closeForm();
      this.form.resetFields()
    },
    handleUploadChange (v) {
      if (v.fileList.length === 0) {
        this.fileList = [];
      }
    },
    handleAddZone () {
      let record = this.$store.state.host.record,
        types = this.$store.state.host.types,
        editType = record.type,
        message = this.$message;
      this.$confirm({
        icon: "exclamation-circle",
        title: "添加主机类别",
        content: (h) => (
          <a-form>
            <a-form-item required label="主机类别">
              <a-input onChange={(e) => (editType = e.target.value)} />
            </a-form-item>
          </a-form>
        ),
        onOk: () => {
          if (editType && types.indexOf(editType) == -1) {
            types.push(editType);
            this.form.setFieldsValue({ type: editType });
          } else {
            message.error("添加类型失败，类型已存在");
          }
        },
      });
    },
    handleEditZone () {
      let record = this.$store.state.host.record,
        editType = record.type,
        message = this.$message;
      this.$confirm({
        icon: "exclamation-circle",
        title: "编辑主机类别",
        content: (h) => (
          <a-form>
            <a-form-item
              required
              label="主机类别"
            // help="该操作将批量更新所有属于该类别的主机并立即生效，如过只是想修改单个主机的类别请使用添加类别或下拉框选择切换类别。"
            >
              <a-input
                defaultValue={record.type}
                onChange={(e) => (editType = e.target.value)}
              />
            </a-form-item>
          </a-form>
        ),
        onOk: () =>
          http
            .patch("/host/update", {
              id: record.id,
              type: editType,
            })
            .then((res) => {
              console.log("res", res);
              message.success(`成功修改${res}条记录`);
              this.fetchRecords();
              record = this.$store.state.host.record;
              this.form.setFieldsValue({ type: editType });
            }),
      });
    },
  },
};
</script>

<style></style>
