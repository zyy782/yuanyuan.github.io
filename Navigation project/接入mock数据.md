#### 使用axios接入mock数据
1. 引入axios
```
import axios from 'axios'
```
2. 导出取接口中数据的方法

可以指定默认配置先取出接口地址中的公共部分
```
// 指定默认配置  
axios.defaults.baseURL = 'https://www.fastmock.site/mock/85a46960d7013b5ce0eb8b3deebbcb93/navigation'

export function getSkills() {
    return axios({
        url: '/skill',
        method: 'get',
    })
}

```
3. 在需要获取数据的组件中 定义空数组用来接收接口中的数据
```
  data() {
    return {
      skills: []
    }
```
4. 在created()中实现具体的方法   
   因为created()之前data还未初始化，created()时data才完成初始化。也可以放在mouted中实现，但一般放在created中。
```
  created() {
      getSkills().then((res) => {
          this.skills = res.data.Skill.list
    }),
  },
```


mock接口中的数据如下：
```
{
  "code": "0000",
  "Skill": {
    "list": [
       {
          "name": "Vue.js",
          "href": "https://vuejs.org/",
        },
        {
          "name": "Oasis Eigine",
          "href": "https://oasisengine.cn/",
        },
        {
          "name": "Vuemastery",
          "href": "https://www.vuemastery.com/RWV3-free/",
        },
        {
          "name": "ElementUI",
          "href": "https://element.eleme.cn/#/zh-CN/component/installation",
        },
        {
          "name": "Bootstrap",
          "href": "https://getbootstrap.com/",
        },
        {
          "name": "掘金",
          "href": "https://juejin.cn/",
        },
        {
          "name": "FAST",
          "href": "https://www.fast.design/",
        },
        {
          "name": "Bootstrap",
          "href": "https://getbootstrap.com/",
        },
      ],
    "url": "'11111'"
  },
  "desc": "成功"
}
       
```