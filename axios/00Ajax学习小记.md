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
 图

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

