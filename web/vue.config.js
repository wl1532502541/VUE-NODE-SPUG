module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave:false,
  devServer: {
    host: "localhost",
    port: 8080, // 端口号
    https: false,
    open: false, // 配置后自动启动浏览器
    hotOnly: true, // 热更新
  }
};