# 员工信息数据处理
### 原数据格式：
```
[{
        "name": "杨大大",
        "unit": "云事业群",
        "level": "前端开发工程师",
        "team": "云事业群/研发中心/基础研发部"
    },
    {
        "name": "张三",
        "unit": "AiLPHA大数据智能安全事业群",
        "level": "前端开发工程师",
        "team": "AiLPHA大数据智能安全事业群/APT事业部"
    },
    ......
    {
        "name": "赵四",
        "unit": "大头爸爸有限公司",
        "level": "前端开发工程师",
        "team": "大头爸爸有限公司/大头产品研发部"
    }]
```


### 结果数据格式：
```
{
    "云事业群": {
        "研发中心": {
            "基础研发部": [
                "杨大大",
                "村长",
                "面包",
                "牛奶",
                "火腿肠",
            ]
        }
    },
    "AiLPHA大数据智能安全事业群": {
        "APT事业部": [
            "张三",
            "小美"
        ],
        "新监管态势感知事业部": {
            "新监管产品研发部": [
                "小头儿子",
                "熊大",
            ],
            "上海研发部": [
                "熊二"
            ]
        },
        "数据库审计事业部": [
            "喜洋洋",
            "美羊羊",
            "懒羊羊"
        ],
        "数据安全基础产品事业部": {
            "数据库网关研发部": [
                "沸羊羊"
            ],
            "UEBA研发部": [
                "佩奇",
                "叮当猫"
            ],
        },
..............
}
```
### 代码
```
let data = []
let teams = []
let result = {}//结果数组
for (const i in aa) {//aa为原始数组
    data.push(aa[i])
}
function res(team, name) {
    let flag = result
    let i;
    for (i = 0; i < team.length - 1; i++) {
        if (flag[team[i]] === undefined) {
            flag[team[i]] = {}
        }
        <!--     向内层遍历   -->
        flag = flag[team[i]]
    }
    if (flag[team[i]] === undefined) {
        flag[team[i]] = [name]
    } else {
        flag[team[i]].push(name)
    }

}

for (let i = 0; i < data.length; i++) {
    teams = data[i].team.split('/')
    let aa = res(teams, data[i].name)
}
console.log(result)

```
观察原数据与结果数据的格式差异：    
关键点在于team属性，需要按照team的分层情况以对象的形式进行输出。
因此需要遍历数组，判断有无下一层，有则创建对象，直到没有下一层时，将name数组输入其中。
+ 函数res(team, name)：按照team数组一层层添加属性   最后一层将name数组添加进去   
   1.通过flag指针 向result结果数组的内层进行遍历
   2.flag[team[i]] === undefined  说明对象数组中该属性还未定义--->创建对象
   3.跳出for循环时判断 flag[team[i]] === undefined  说明最内层的属性还未定义---->将其变为数组，并传入name；若已定义，则直接添加name
+  最后循处理每条数据   输出结果
