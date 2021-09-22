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
      // 先写死 以后再写接口 从服务端读取本地密钥对
      public_key: `ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCUErHkhvxR58XN5ZYgS6IXNbIbqM80rpw9UMGd2/jtkfL4fXItwbTvmh3PBD1A/AU3D7royhCIJxo/7nVAP4jZ3oMkXZbWrhmR+7C5Gd4imXYgYHdsnwZNVxVlgJfYzTg5QsRTchKepWIe1aPXzTw9VGQfn1AzOA5iFbHcbKdWevft/JZuh7Vsj+dVJg/dqfEQt4rHT/Z/WGq2pmUvz0mhVJCN3bKybD+iVnXi7PoZSt7GMKJiG8rsrkcpsG4+VKgxGQc17a33ULRXSQhDg52+v36yhhE3VFkysZG5rtB8/YnTN1XmtvNs0xNy0yHKNxungxXNSRbyKSwuJamPr5FtijQ6dxL8/0f0AzflABXFmWhJB1qQTa3l6BpwPYAIaHXvjfnmmRGSiPEoK583AEp1rdzB16rsm0NJXWxvs8llJpmn0yymzFcmUCWkJwHXlt4jpSQEwvWDrxQgxP7btN7E5Nd94pdXhqf2LATlW2DaGxQceyKSICPig2J2QU9KKM0= wl@DESKTOP-Q4BVDJS`,
      private_key: `-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----
`,
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
