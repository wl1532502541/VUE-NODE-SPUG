module.exports = (app) => {
  // 账户相关接口
  require('./api/account')(app)
  // 主机相关接口
  require('./api/host')(app)
  // ws ssh接口
  require('./ssh')(app)
}