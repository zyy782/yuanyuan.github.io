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
[实现跨域的三种方法](https://blog.csdn.net/huzhenv5/article/details/104884760)   
1. **document.domain实现跨域**   
     + 相同二级域名之间的跨域
     + 相同域名、不同端口之间的跨域
2. **window.name实现跨域**  
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

    <iframe src="http://127.0.0.1:5500/axios/02.html" frameborder="0"></iframe>

    <script>
        var ifr = document.querySelector('iframe')
        ifr.style.display = 'none'
        var flag = 0;
        ifr.onload = function() {
            if (flag == 1) {
                console.log('跨域获取数据', ifr.contentWindow.name);
                ifr.contentWindow.close();
            } else if (flag == 0) {
                flag = 1;
                ifr.contentWindow.location = 'http://127.0.0.1:5501/proxy.html';
            }
        }
    </script>
   </body>
   ```

   结果如下：   

![%I0B`0`DOP26I3}TMRVVBVN](https://user-images.githubusercontent.com/71962217/133713624-a925d485-1a80-45f6-895f-6a2c7036b29d.png)
![5CNPQ P9IC(K)YLV{CSVMX4](https://user-images.githubusercontent.com/71962217/133713636-7c75cb8a-f441-4bd2-9b21-e17e71e526d1.png)
![UZZ0L6JQPZUYH$NU}@HT(2K](https://user-images.githubusercontent.com/71962217/133713652-abd72a09-9d00-421c-ba07-59423ed609b4.png)
   
   分析：   
   widow.name不是一个一般的全局属性，一旦设置，后续就不会再改变。即使url变化，ifram中的window.name也是一个固定的值。   
   所以，首先把要获取的第一个页面中的数据设置到window.name中   
   然后在页面2中使用iframe标签将页面1加载过来。这样，iframe中的window.name就已经成功设置。  
   最后，再把src设置为当前域的proxy.html就可以实现跨域，即http://127.0.0.1:5501/proxy.html    
   设置flag的意义：   
   每当改变location的时候，就会重新来一次onload，而我们希望获取到数据之后，就直接close()
   



