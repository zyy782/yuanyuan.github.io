const express = require('express')
const api = require('./mock-data/index') // 接口数据模拟

let app = express() // 创建一个服务

const port = 8091

// 注册 express.json() 中间件，用于解析 JSON 请求体
app.use(express.json());

// 为所有路径和所有 HTTP 方法（GET、POST、PUT、DELETE 等）定义一个处理函数
app.all('*', function (req/**请求对象*/, res/**响应对象*/, next/**回调函数*/) {
  // 允许跨域请求
  res.header("Access-Control-Allow-Origin", req.headers.origin || 'http://127.0.0.1:' + port);
  // 允许携带凭证
  res.header("Access-Control-Allow-Credentials", "true");
  // 设置相应头
  res.header("Access-Control-Allow-Headers", "x-msg-timeout,X-Msg-Trace,csrfcheck,ShardingInfo,Partition,broker_key,X-Original-URI,X-Request-Method,Authorization,access_token,login_account,auth_password,user_type,tenant_id,auth_code,Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With,X-Gw-Req-Auth-Sign,X-Gw-Req-Sign,notHump, resnothump, X-Gw-Access-Token");
  // 设置 Content-Type
  res.header("Content-Type", "application/json;charset=utf-8");

  if (req.method.toLowerCase() === 'options') {
    res.send(200);  //让options尝试请求快速结束
  } else {
    // console.log('req.url', req.url)
    next();
  }
});

Object.keys(api).forEach(function(key) {
  const protocol = key.split(' ')
  console.log('protocol', protocol[1], protocol[0])
  if (protocol[0].toUpperCase() === 'POST') {
    app.post(protocol[1], api[key])
  }
  if (protocol[0].toUpperCase() === 'GET') {
    app.get(protocol[1], api[key])
  }
})

// app.listen(port, () => { console.log(Server running on http://localhost:${port}`); });` 启动服务器，并监听指定端口。
app.listen(port)




// const getLineData = (params={})=>{
//   $vm?.proxy?.$api
//       .post("/indiDashGmgl/indiDashGmglViewQry", params)
//       .then((res:any) => {
//           data.lineData = arrayToNumber(res.echartData) || []
//           data.categories = res.categories || []
//           data.xLineText = res.xLineText || []
//           emit('on-change-data', {
//               name:res.name,
//               totalValue:res.totalValue,
//               totalUnit:res.totalUint,
//               totalValueOriginal:res?.totalValueOriginal,
//               totalUintOriginal:res?.totalUintOriginal
//           })
//       });
// }

// getLineData({selectType: '0'})

