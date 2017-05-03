/*常量的定义*/
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const low = require('lowdb');
const storage = require('lowdb/file-async');

//创建express 服务器
const server = jsonServer.create();

//使用json-server 默认选择中间件
server.use(jsonServer.defaults());

//使用body-parse中间件
server.use(bodyParser.json());


//数据文件
const dbFile = process.env.prod === '1' ? 'db.json' : '_db.json';

//创建lowdb实例
const db = low(dbFile, {storage});

//路由配置
const router = jsonServer.router(dbFile);
server.use('/api', router);

//启动服务 ，并监听端口5000
server.listen(5000, () => {
    console.log('server is running at', 5000, dbFile);
});


