<template>
  <div class="container">
    <div class="header">
      <div>{{host.hostname}} | {{host.username}}@{{host.ip}}:{{host.port}}</div>
      <a-button type="primary" icon="folder-open" @click="handleShow()">文件管理器</a-button>
    </div>
    <div class="terminal">
      <div ref="terminal_container" />
    </div>
    <FileManager :id="id" :visible="fileVisible" :onClose="handleShow" />
  </div>
</template>
<script>
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { getHost } from "@/api/host"
import FileManager from './components/FileManager.vue'
export default {
  name: "Ssh",
  components: {
    FileManager
  },
  data () {
    return {
      term: new Terminal(),
      container: null,
      id: this.$route.params.id,
      host: {},
      socket: null,
      fileVisible: false
    };
  },
  methods: {
    _fetch () {
      console.log('_fetch')
      getHost(this.id).then((res) => {
        console.log('_fetch 得到主机信息：', res);
        document.title = res.hostname;
        this.host = res
      })
    },
    _read_as_text (data) {
      console.log("收到信息：", data)
      // const reader = new window.FileReader();
      // reader.onload = () => this.term.write(reader.result);
      // reader.readAsText(data, "utf-8");
      this.term.write(data)
    },
    handleShow () {
      this.fileVisible = !this.fileVisible
    }
  },
  created () {
    this._fetch();
  },
  mounted () {
    console.log(this.id)
    console.log("host", this.host)
    this.container = this.$refs.terminal_container;
    // this._fetch();
    const fitPlugin = new FitAddon();
    this.term.loadAddon(fitPlugin);
    // this.term.write('connecting...')
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    this.socket = new WebSocket(
      // `${protocol}//${window.location.host}/ws/ssh/${this.id}`
      // `${protocol}//localhost:3000/ssh/${this.id}?token=${this.$store.getters['user/token']}`
      `${protocol}//localhost:3000/ssh/${this.id}?token=${localStorage.getItem('token')}`
    );
    // console.log('token',this.$store.getters['user/token'])
    let interval = setInterval(() => {
      // this.term.write('.')
    }, 1000)
    this.socket.onmessage = (e) => {
      if (interval) {
        clearInterval(interval)
        interval = null
        this.term.write('\r\n')
      }
      console.log("e", e)
      this._read_as_text(e.data);
    }
    this.socket.onopen = () => {
      console.log("成功建立socket连接")
      // this.container = this.$refs.terminal_container;
      this.term.open(this.container);
      // this.term.open(document.getElementById('terminal_container'))
      this.term.focus();
      fitPlugin.fit();
    };
    this.socket.onclose = (e) => {
      if (e.code === 3333) {
        window.location.href = "about:blank";
        window.close();
      } else {
        setTimeout(() => this.term.write("\r\nConnection is closed.\r\n"), 200);
      }
    };
    this.term.onData((data) => this.socket.send(data));
    // this.term.onResize(({ cols, rows }) => {
    //   this.socket.send(JSON.stringify({ resize: [cols, rows] }));
    // });
    window.onresize = () => fitPlugin.fit();

  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.actions {
  display: flex;
  align-items: center;
}
.terminal {
  flex: 1;
  display: flex;
  background-color: #000;
  padding-left: 5px;
}
.terminal > div {
  flex: 1;
}

.header {
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: #e6f7ff;
}
</style>
