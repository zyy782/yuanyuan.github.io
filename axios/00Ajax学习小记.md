## Ajax
###  1. [简介](https://baike.baidu.com/item/ajax/8425?fr=aladdin   ) 
#### Ajax介绍
1. Ajax即Asynchronous Javascript And XML（异步JavaScript和XML）  
在 2005年被Jesse James Garrett提出的新术语，用来描述一种使用现有技术集合的新方法,包括HTML或XHMTL，CSS，JavaScript，DOM，XML，XSLT，以及最重要的**XMLHttpRequest**。

2. 使用Ajax技术网页应用能够快速地将增量更新呈现在用户界面上，而不需要重载（刷新）整个页面，这使得程序能够更快地回应用户的操作。
3. Ajax不是一种新的编程语言，而是一种用于创建更好更快以及交互性能更强的web应用程序的技术。
4. **通过Ajax可以在浏览器中向服务器发送异步请求**，最大优势：**无刷新获取数据**


#### Ajax优点

1. 可以无需刷新页面而与服务器端进行通信。
2. 允许你根据用户事件来更新部分页面内容。


#### Ajax的缺点

1. 没有浏览历史，不能回退
2. 存在跨域问题(同源)
3. SEO(搜索引擎优化)不友好

#### XML简介（已被JSON代替）

1. XML 可扩展标记语言
2. XML 被设计用来传输和存储数据
3. XML和HTML相似，但是HTML中都是预定义标签，而XML中没有预定义标签，全都是自定义标签，用来表示一些数据。
4. HTML最大的特点是简单性和跨平台性， 但HTML有无法描述数据、可读性差、搜索时间长等缺点



#### HTTP协议


### 2. AJAX工作原理
![Image](https://user-images.githubusercontent.com/71962217/133187231-b181c0b2-c7a8-48bf-87e7-35a740e8cecf.png)

### 3.应用  
#### 1 创建对象  
#### 2 发送请求   
  1.  **open(method,url,async)**   

         method: GET 或 POST   
         async：true为异步 false为同步
        
  2. **send()**  
         仅用于POST请求
#### 3 响应
   1. responseText：获取字符串形式的相应数据
   2. responseXML：获取XML形式的响应数据
#### 4 onreadystatechange 事件   
readyState属性存有XMLHttpRequest 对象的状态信息：  
 0：请求未初始化  
   1：服务器连接已建立  
   2：请求已接收   
   3：请求处理中   
   4：请求已完成，且响应已就绪   

当readyState发生变化时，触发onreadystatechange事件

[status常见状态码](https://www.jianshu.com/p/a746b18396e2)：   
200："OK"   
404：未找到页面

#### [案例](ajax.html)




##### GET 与 POST 对比   
从w3schools得到的标准答案如下：  
+ GET在浏览器回退时是无害的，而POST会再次提交请求。
+ GET产生的URL地址可以被Bookmark，而POST不可以。
+ GET请求会被浏览器主动cache，而POST不会，除非手动设置。
+ GET请求只能进行url编码，而POST支持多种编码方式。
+ GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
+ GET请求在URL中传送的参数是有长度限制的，而POST没有。
+ 对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
+ **GET比POST更不安全**，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
+ **GET参数通过URL传递，POST放在Request body中**   
  
  本质上来说，他们并无区别。
  GET 和 POST 是 HTTP 协议中的两种发送请求的方法，HTTP 是基于 TCP/IP 的。  
  HTTP 的底层是 TCP/IP。所以 GET 和 POST 的底层也是 TCP/IP，也就是说，**GET/POST 都是 TCP 链接**。GET 和 POST 能做的事情是一样一样的。

<br>
<br>

<hr>

#### 关于ajax跨域   
在学习跨域之前，我们首先要了解一下浏览器同源策略    
### [**同源策略**](https://baike.baidu.com/item/%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5/3927875)    
    
#### 主要作用：   
同源策略是浏览器的行为，是为了**保护本地数据不被JavaScript代码获取回来的数据污染**，因此拦截的是客户端发出的 请求回来的数据接收，即请求发送了，服务器响应了，但是无法被浏览器接收   
#### 什么是同源？
MDN对同源是这样解释的：   
如果两个 URL 的  **protocol（协议）**、 **port (en-US)** (如果有指定的话) 和 **host（主机）** 都相同的话，则这两个 URL 是同源。    
![{_9}AB0LHJF}G L`RAR@6WL](https://user-images.githubusercontent.com/71962217/133713548-09eac504-0415-4e6c-92f0-ec6d1f0995fc.png)

url的组成如下： 
```
<协议>://<域名>:<端口>/<路径>     

域名：
主机名、机构名、网络名、最高层域名
```
#### 源的修改   
利用document接口的domain属性，可设置/获取当前文档的原始部分    
【获取域名】
```
 // http://127.0.0.1:5500/axios/02.html

 var currentDomain = document.domain;
 console.log(currentDomain)//127.0.0.1
```
【源的修改】
```
  document.domain = "127.0.0.2"
```

同域的不同页面之间通信可通过自定义事件和监听事件的方式实现，那么不同域的页面如何实现通信呢？     
接下来就步入正题，介绍实现跨域的几种方法       

#### **1 document.domain实现跨域**   
+ 相同二级域名之间的跨域
+ 相同域名、不同端口之间的跨域
   
    https://blog.csdn.net/huzhenv5/article/details/104884760
#### **2 window.name实现跨域**  
   举个栗子!!!  
   现有两个页面：   
   第一个：http://127.0.0.1:5500/axios/02.html   
   第二个：http://127.0.0.1:5501/02.html   
   两个页面端口不同，为跨域请求。现，要在第二个页面中拿到第一个页面的数据。   
   第一个页面如下：   
   ```
   <body>
    <h1>http://127.0.0.1:5500/axios/02.html 页面1</h1>
    <script>
        var person = {
            name: 'wayne zhu',
            age: 22,
            school: 'xjtu'
        }
        window.name = JSON.stringify(person)
        console.log(window.name)
        // {"name":"wayne zhu","age":22,"school":"xjtu"}
    </script>
   </body>
   ```
   第二个页面如下：   
   ```
   <body>
    <h1>http://127.0.0.1:5501/02.html 页面2</h1>
    <p>实现把页面1的数据传递到该页面</p>

    <iframe src="http://127.0.0.1:5500/axios/02.html" frameborder="1"></iframe>

    <script>
        var iframe = document.querySelector('iframe')
        //iframe.style.display = 'none'
        var flag = 0;
        iframe.onload = function() {
            if (flag == 1) {
                console.log('跨域获取数据', iframe.contentWindow.name);//获取window.name
                iframe.contentWindow.close();//销毁数据
            } else if (flag == 0) {
                flag = 1;
                //设置代理文件
                iframe.contentWindow.location = 'http://127.0.0.1:5501/proxy.html';
            }
        }
    </script>
   </body>
   ```

   代理文件proxy.html   
   ```
   <body>
    <p>这是proxy页面</p>
   </body>
   ```

   结果如下：   

![%I0B`0`DOP26I3}TMRVVBVN](https://user-images.githubusercontent.com/71962217/133713624-a925d485-1a80-45f6-895f-6a2c7036b29d.png)
![5CNPQ P9IC(K)YLV{CSVMX4](https://user-images.githubusercontent.com/71962217/133713636-7c75cb8a-f441-4bd2-9b21-e17e71e526d1.png)
![UZZ0L6JQPZUYH$NU}@HT(2K](https://user-images.githubusercontent.com/71962217/133713652-abd72a09-9d00-421c-ba07-59423ed609b4.png)
   
   分析：   
   widow.name不是一个一般的全局属性，一旦设置，后续就不会再改变。即使url变化，ifram中的window.name也是一个固定的值。   
   所以，首先把要获取的第一个页面中的数据设置到window.name中,所以即使页面1的url发生改变，window中的数据也不会发生改变。   
   然后在页面2中使用iframe标签将页面1加载过来。这样，iframe中的window.name就已经成功设置。我们就可以在页面2中使用contentWindow.name来获取到页面1的 window.name属性     
   但是现在两个文件依旧是非同源，这个时候我们利用一个代理文件proxy.html，将页面1的url改为与页面2同源的代理文件的url。即```iframe.contentWindow.location = 'http://127.0.0.1:5501/proxy.html';```  这样就实现了在页面2中获取到页面1的数据   
     
   设置flag的意义：   
   每当改变location的时候，就会重新来一次onload，而我们希望获取到数据之后，就直接close()    
   [ contentWindow ](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement/contentWindow)   
   contentWindow.location    :修改iframe所指向的页面



#### **3 [window.postMessage实现跨域](https://blog.csdn.net/huzhenv5/article/details/104884760)**
[语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)：```otherWindow.postMessage(message, targetOrigin, [transfer]);```

#### 4 CORS解决跨域
后端通过设置 CORS 来解决跨域。    
跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP Header来告诉浏览器 让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。
```
// 在node端设置一下请求头，允许接收所有源地址的请求
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', '*');

```
#### 5 JSONP 

同源限制是跨域的本质，也就是没有同源限制这么个东西，那么也就不存在跨域了。事实上，存在一些标签没有同源限制 ```<script>/<link>/<img>```(有src属性的都没有同源限制)。    
JSONP 利用的原理就是这些标签来解决跨域的问题。
1. 浏览器遇到```<script>```就会执行里面的内容
```
// 按钮获取数据
<button onclick="loadJsonpData()">JSONP获取数据</button>

<script>
  function loadJsonpData() {
    const script = document.createElement('script');
    script.src='http://localhost:3000/jsonp/list';
    document.body.appendChild(script);
  }
</script>

作者：前端周同学
链接：https://juejin.cn/post/6844904029420519437

```
2. 前后端约定一个执行函数的名称callback
3. 前端定义这个callback执行函数，来获取到后台的数据
4. 后台返回一个携带数据的callback可执行函数


相关文章    
http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html    
https://segmentfault.com/a/1190000012469713


### 2022.3.1 [b站项目，实现跨域部分](https://www.bilibili.com/video/BV1HA411p7aA?p=8&spm_id_from=pageDriver)      
>前景提要 ： 前端端口号为8080，后端为8081，现实现跨域以拿到后端的接口数据。
>方法：proxy代理     
>![image](https://user-images.githubusercontent.com/71962217/156124450-b8ad173d-0b72-4f72-be26-320b840c1559.png)

[proxy参考](https://www.jianshu.com/p/2a8ec76e0090)

