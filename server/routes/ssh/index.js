module.exports = (app) => {
    const {Client} = require('ssh2');
    const expressWs = require('express-ws')(app)
    const utf8 = require('utf8')
    const fs = require('fs')
    
    // 登陆验证中间件
    const auth = require("../../middleware/sshValidateMiddleWare")

    const createNewServer = (machineConfig, socket) => {
        const ssh = new Client();
        const { port, ip:host, username, password, pKey } = machineConfig;
        // 连接成功
        ssh.on('ready',function(){
            console.log('ssh ready')
            ssh.shell((err, stream) => {
                // 出错
                if(err){
                    return socket.send('\r\n SSH SHELL ERROR:' + err.message + '\r\n');
                }
                // 转发前端的命令给ssh服务机
                socket.on('message', (data) => {
                    stream.write(data); 
                });

                // 转发ssh服务机的消息给前端
                stream.on('data', (data) => {
                    socket.send(utf8.decode(data.toString('binary')));
                // 关闭连接
                }).on('close', () => {
                    console.log('ssh end')
                    ssh.end();
                });
            })
        // 连接
        }).connect({
            host,
            port:port&&Number(port) || 22,
            username,
            // password:'wojiaowl',
            privateKey:fs.readFileSync('c:/users/wl/.ssh/id_rsa'),
            // debug: (s) => {console.log(s)}
        // 关闭连接
        }).on('close',() => {
            socket.send('\r\n SSH CONNECTION CLOSED \r\n')
        // 连接错误
        }).on('error',(err) => {
            console.dir('连接错误'+err)
            socket.send('\r\n SSH CONNECTION ERROR \r\n'+err)
        })
    }

    app.ws('/ssh/:id',auth(app),async function(ws, req){
        const _id = req.params.id
        // console.log('111',req._parsedUrl)
        const Host = require('../../models/Host')
        const host = await Host.findById(_id)
        // console.log(fs.readFileSync('c:/users/wl/.ssh/id_rsa',{encoding:'utf8'}))
        // console.log(fs.readFileSync('pKey.txt'),utf8)
        //暂时没开密码链接
        console.log(host)
        createNewServer(host,ws)
    })
}