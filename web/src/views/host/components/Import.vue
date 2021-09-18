<template>
  <div>
    <a-button
      type="primary"
      @click="setVisible(importHost, true)"
      style="margin-left: 20px"
    >
      <a-icon type="import"></a-icon>
      批量导入
    </a-button>
    <a-modal
      title="批量导入"
      :visible="importHost.visible"
      :confirm-loading="importHost.confirmLoading"
      ok-text="确定"
      cancel-text="取消"
      @ok="handleOk(importHost)"
      @cancel="setVisible(importHost, false)"
      width="800px"
    >
      <a-alert
        v-show="importHost.information.visible"
        description="导入或输入的密码仅作首次验证使用，并不会存储密码。"
        type="info"
        closable
        show-icon
        style="width: 600px; margin: 0 auto 20px"
      />
      <a-form
        layout="horizontal"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-item label="模板下载" extra="请下载使用该模板填充数据后导入">
          <a href="../123.xlsx" download="主机导入模板.xlsx"
            >主机导入模板.xlsx</a
          >
        </a-form-item>
        <a-form-item label="默认密码" extra="如果excel中密码为空则使用该密码">
          <a-input placeholder="请输入默认主机密码"> </a-input>
        </a-form-item>
        <a-form-item label="导入数据">
          <a-upload
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="handleChange"
          >
            <a-button> <a-icon type="upload" /> 点击上传 </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //按钮 批量导入
      importHost: {
        name: "importHost",
        visible: false,
        confirmLoading: false,
        information: { visible: true },
      },
    };
  },
};
</script>

<style>
</style>
