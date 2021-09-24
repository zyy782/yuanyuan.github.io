### this指向的是一个对象→上下文对象
 根据函数调用的不同 this会指向不同的对象    
 1. 以函数的形式调用时  this永远是windows
 2. 以方法的形式调用时，this就是指调用方法的那个对象
 3. 箭头函数没有自己的this

## 改变this指向的几种方法
### call()
-第一个参数：上下文对象     
-第二个参数：一个参数列表     
```fn.apply(obj,name,age)   ```    
在继承中的应用：    
```
    function Parent1(name) {
        this.name = name
    }
    function Child1(name) {
        // 调用父构造函数的call来实现继承
        Parent1.call(this, name); 
        //理解为  调用Parent1 并 把Parent1的this修改为Child1的this 
    }
    var child1 = new Child1();
    console.log(child1.name); //undefined

    var child2 = new Child1('Amy');
    console.log(child2.name); //Amy
```
            
### apply()
-第一个参数：上下文对象    
-第二个参数：函数参数组成的**数组**       
```fn.apply(obj,[name,age])   ```    
主要应用：   
1. 改变this指向
2. 利用apply 借助数学内置对象Math.max()min()求数组的最大最小值
```
var arr = [1, 2, 3, 4]
var max = Math.max.apply(Math, arr) //不需要改变指向  所以第一个参数可以填null 最好填Math
console.log(max) //4
```

### bind()
 bind()也可以改变this指向    
但是不同于apply()和call()的是 它不会调用函数！！！
```
function.bind(thisArg, arg1, arg2, ...)
      -thisArg：在function函数运行时指定的this值(上下文对象)
      -返回的是 由指定的this值和初始化参数改造的原函数拷贝（改变this后产生的新函数）
```   
 主要应用：    
1. 有的函数**不需要立即调用** 但**又想改变函数内部的this指向**时    
   比如说有一个按钮 我们点击之后禁用掉这个按钮 3秒之后重新开启这个按钮
   ```
   var btn = document.querySelector("button")
        btn.onclick = function() {
            this.disabled = true; //this指向btn
            setTimeout(function() {
                this.disabled = false //this指向window
            }.bind(this), 3000)
        }
   ```
   等同于：   

   ```
   var btn = document.querySelector("button")
        btn.onclick = function() {
            this.disabled = true; //this指向btn
            var that  = this
            setTimeout(function() {
                that.disabled = false    
            }, 3000)
        }
   ```  


### 区别
对于 apply、call 二者而言，作用完全一样，都是立即调用，只是接受参数的方式不太一样。   
除了第二个参数上的区别，bind与call、apply最大的区别就是，它不会立即调用函数，而是返回一个函数。   
MDN的解释是：   
bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时**传入 bind()方法的第一个参数作为 this**，**传入 bind() 方法的第二个以及以后的参数** 加上绑定函数运行时本身的参数 按照顺序 **作为原函数的参数 来调用原函数。**   


### 应用—— 将函数的实际参数转换为数组的几种方法  

```
var args = Array.prototype.slice.call(arguments);
```

```
var args = [].slice.call(arguments, 0);
```

```
 var args = []; 
 for (var i = 1; i < arguments.length; i++) { 
    args.push(arguments[i]);
 }
```  
##### 题目描述  1 
实现函数 callIt，调用之后满足如下条件   
1、返回的结果为调用 fn 之后的结果   
2、fn 的调用参数为 callIt 的第一个参数之后的全部参数
```
// arguments是类数组对象，并不是真正的对象，没有slice这个方法

function callIt(fn) {
    let args = Array.prototype.slice.call(arguments, 1) //相当于调用数组arguments.slice(1)
    return fn.apply(this, args)
}
```

##### 题目描述  2    
实现函数 partialUsingArguments，调用之后满足如下条件：  
1、返回一个函数 result   
2、调用 result 之后，返回的结果与调用函数 fn 的结果一致    
3、fn 的调用参数为 partialUsingArguments 的第一个参数之后的全部参数以及 result 的调用参数    
```
function partialUsingArguments(fn) {
    let args1 = Array.prototype.slice.call(arguments, 1)

    return function () {
        let args2 = Array.prototype.slice.call(arguments, 0)
        return fn.apply(this, args1.concat(args2))
    }
}

```
