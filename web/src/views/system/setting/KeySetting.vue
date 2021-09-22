<template>
  <div>
    <div class="title">密钥设置</div>
    <a-alert closable showIcon type="info" style="width:650px" message="小提示" description="在这里你可以上传并使用已有的密钥对，没有上传密钥的情况下，Spug会在首次添加主机时自动生成密钥对。" />
    <a-form style="max-width: 650px">
      <a-form-item label="公钥" help="一般位于 ~/.ssh/id_rsa.pub">
        <a-textarea v-model="public_key" placeholder="请输入公钥" autosize="true" />
      </a-form-item>
      <a-form-item label="私钥" help="一般位于 ~/.ssh/id_rsa">
        <a-textarea v-model="private_key" placeholder="请输入私钥" :autosize="{minRows:2,maxRows:8}" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary">保存设置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "KeySetting",
  data() {
    return {
      public_key: `公钥`,
      private_key: '私钥',
    };
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
}
</style>
