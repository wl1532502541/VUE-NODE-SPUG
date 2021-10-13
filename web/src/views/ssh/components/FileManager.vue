<template>
  <a-drawer title="文件管理器" width="900" :visible="visible" :after-visible-change="afterVisibleChange" @close="onClose()">
    <div class="drawHeader">
      <a-breadcrumb>
        <a-breadcrumb-item @click="handleChdir()">
          <a-icon type="home"></a-icon>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div style="display:flex;align-items:center">
        <span>显示隐藏文件：</span>
        <a-switch :checked="showDot" checkedChildren="开启" unCheckedChildren="关闭" @change="v=>showDot=v" />
        <a-button style="margin-left:10px" size="small" type="primary" icon="upload" @click="handleUpload">上传文件</a-button>
      </div>
    </div>
    <a-table size="small" rowKey="name" :loading="fileFetching" :columns="columns" :dataSource="filesData">
    </a-table>
  </a-drawer>
</template>

<script>
export default {
  name: "FileManager",
  props: {
    id: String,
    visible: Boolean,
    onClose: Function,
  },
  data () {
    return {
      showDot: false,
      fileFetching: false,
      filesData: [],
      columns: [
        {
          title: '名称',
          key: 'name',
          dataindex: 'name'
        },
        {
          title: '大小',
          dataIndex: 'size',
          align: 'right'
        }, {
          title: '修改时间',
          dataIndex: 'date',
          width: 190
        }, {
          title: '属性',
          key: 'attr',
          width: 120
        }, {
          title: '操作',
          width: 80,
          align: 'right',
          key: 'action',
        }
      ],

    }
  },
  methods: {
    onShow () {
      if (visible) {
        // this.fetchFiles()
      }
    },
    handleChdir () {

    },
    handleUpload () {

    },
    afterVisibleChange () {

    }
  }
}
</script>

<style>
.drawHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
</style>