<template>
  <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
    <a-table
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        @change="handleTableChange"
    >
      <template
          v-for="col in ['username']"
          :slot="col"
          slot-scope="text, record"
      >
        <div :key="col">
          <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.id, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => onUpdate(record.id)">保存</a>
            <a-popconfirm
                title="确认取消?"
                @confirm="() => onCancel(record.id)"
            >
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => onEdit(record.id)">
              编辑
            </a>
          </span>
        </div>
        <a-popconfirm
            v-if="data.length"
            title="确认删除?"
            @confirm="() => onDelete(record.id)"
        >
          <a href="javascript:">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import qs from "qs";
let data = [];
export default {
  name: "User",
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      editingKey: "",
      loading: false,
      pagination: {
        total: 1,
        current: 0,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"]
      },
      queryParam: {
        page: 1, //第几页
        size: 10 //每页中显示数据的条数
      },
      form: {
        username: "",
        password: ""
      }
    };
  },
  props: {
    apis: Object,
    title: String,
    columns: Array
  },
  mounted() {
    this.fetchData(this.pagination);
    this.$nextTick(function() {
      this.$on("fetchTable", function() {
        this.fetchData(this.pagination);
      });
    });
  },
  methods: {
    routeTo(path, id) {
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      });
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.queryParam.page = pagination.current;
      this.queryParam.size = pagination.pageSize;
      this.fetchData(pagination);
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.id)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    onDelete(key) {
      const data = [...this.data];
      this.$axios(this.apis["delete"], {
        method: "GET",
        params: {
          id: key
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.data = data.filter(item => key !== item.id);
        } else {
          alert("删除失败");
        }
      });
    },
    onEdit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.id)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    onUpdate(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.id)[0];
      const targetCache = newCacheData.filter(item => key === item.id)[0];
      delete target.editable;
      if (target && targetCache) {
        delete target.editable;
        this.$axios
            .post(this.apis["update"], JSON.stringify(target), {
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(res => {
              if (res.data.code === 200) {
                this.data = newData;
                Object.assign(targetCache, target);
                this.cacheData = newCacheData;
              } else {
                console.log("");
              }
            });
      }
      this.editingKey = "";
    },
    onCancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.id)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
            target,
            this.cacheData.filter(item => key === item.id)
        );
        delete target.editable;
        this.data = newData;
      }
    },
    onSave() {
      this.$axios(this.apis["save"], {
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        data: qs.stringify(this.form)
      }).then(res => {
        if (res.data.code === 0) {
          this.fetchData(this.pagination);
        } else {
          alert("添加失败");
        }
      });
    },
    fetchData(params = {}) {
      this.loading = true;
      console.log('fetch')
      this.axios.get(this.apis["getAll"]+"?filter=&page="+params.current+"_"+params.pageSize+"&sort=-createTime").then(res => {
        if (res.data.code === "200") {
          /*this.data = res.data.data.data;*/
          this.data = res.data.items
          console.log(' ')
          this.cacheData = this.data.map(item => ({ ...item }));
          console.log("请求成功,数据为：", res.data.data);
        }
      });
    }
  }
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>