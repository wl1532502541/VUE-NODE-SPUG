<template>
  <div class="container">
    <div class="terminal">
      <div ref="terminal" />
    </div>
  </div>
</template>
<script>
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
// import http from "../../libs/http";
import {fetch} from "@/api/ssh"
export default {
  name: "Ssh",
  // props: {
  //   terminal: {
  //     type: Object,
  //     default: {}
  //   }
  // },
  data() {
    return {
      term: new Terminal(),
      container: null,
      id: this.$route.params.id,
      host: null,
      socket: null,
      // terminalSocket: null
    };
  },
  methods: {
    // runRealTerminal () {
    //   console.log('webSocket is finished')
    // },
    // errorRealTerminal () {
    //   console.log('error')
    // },
    // closeRealTerminal () {
    //   console.log('close')
    // },
    _fetch() {
      fetch({params:{id:this.id}}).then((res)=>{
        console.log('_fetch 得到主机信息：',res);
        document.title = res.hostName;
        this.host = res
      })
      // http.get(`/host/get?id=${this.id}`).then((res) => {
      //   console.log("_fetch", res);
      //   document.title = res.hostName;
      //   this.host = res;
      // });
    },
    _read_as_text(data) {
      console.log("收到信息：",data)
      const reader = new window.FileReader();
      reader.onload = () => this.term.write(reader.result);
      reader.readAsText(data, "utf-8");
    },
  },
  mounted() {
    console.log(this.id)
    this.container = this.$refs.terminal;
    this._fetch();
    const fitPlugin = new FitAddon();
    console.log(this.container);
    this.term.loadAddon(fitPlugin);
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    this.socket = new WebSocket(
      // `${protocol}//${window.location.host}/ws/ssh/${this.id}`
      // `${protocol}//${window.location.host}/ws/ssh`
      `${protocol}//localhost:8081/ws/ssh/${this.id}`
    );
    this.socket.onmessage = (e) => this._read_as_text(e.data);
    this.socket.onopen = () => {
      this.term.open(this.container);
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
    this.term.onData((data) => this.socket.send(JSON.stringify({ data })));
    this.term.onResize(({ cols, rows }) => {
      this.socket.send(JSON.stringify({ resize: [cols, rows] }));
    });
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
.terminal {
  flex: 1;
  display: flex;
  background-color: #000;
  padding-left: 5px;
}
.terminal > div {
  flex: 1;
}
</style>
