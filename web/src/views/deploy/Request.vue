<template>

  <a-layout-content style="padding:24px 24px 0;">
    <apptable :apis="apis" :columns="columns" ></apptable>
  </a-layout-content>
</template>

<script>
import apptable from "../../components/apptable"
export default {
name: "Request",
  components:{
    apptable
  },
  data(){
    return{
      apis:{
        "getAll":"/host/filter"
      },
      columns:[
        {
          title:'类别',
          dataIndex: "type",
          key: "type",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "type" }
        },
        {
          title: "主机名称",
          dataIndex: "hostName",
          key: "hostName",
          sorter: (a, b) => a.hostName - b.hostName
        },
        {
          title: "连接地址",
          key: "ip",
          dataIndex: "ip",
          /*defaultSortOrder: 'descend',*/
          sorter: (a, b) => a.ip - b.ip,
          scopedSlots: { customRender: "ip" }
        },
        {
          title: "端口",
          key: "port",
          dataIndex: "port"
        },
        {
          title: "备注信息",
          key: "remarks",
          dataIndex: "remarks"
        },
        {
          title: "操作",
          key: "hostAction",
          scopedSlots: { customRender: "operation" }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>