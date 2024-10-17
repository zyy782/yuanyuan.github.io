## 手写 new 操作符

### new 操作符具体做了什么?
我们知道 new 操作符,是用来创建一个新的对象的,那它具体是怎么做的呢?
当我们用 new 操作符创建一个对象的时候,js 引擎内部做了以下几步:
#### 1. ‌创建空对象‌
   使用 new 操作符时，js首先会在内存中创建一个新的空对象。这个新对象将成为构造函数的实例
#### 2. ‌设置原型链‌
   将新对象的原型（proto）链接到构造函数的原型对象（prototype）上。这样，**新对象 可以访问 构造函数 原型 中定义的属性和方法**‌。
#### 3. 改变this的指向
   **将构造函数的 this 指向新创建的对象，并执行构造函数的代码。这样，构造函数中的代码将初始化新对象的属性**‌。
#### 4. 返回对象实例
   如果构造函数中没有返回其他对象，new操作符将返回新创建的对象实例。如果构造函数中返回了一个对象，那么将返回该对象‌。
   也就是说 constructor 有 return ,且 return 的结果是一个对象的时候, new操作符将不会创建一个新的对象,而是直接返回这个对象.

   例子:
   ```
   function Person(name, age) {
     this.name = name
     this.age = age
     return {
       name: 'new name',
     }
   }
   const person = new Person('Alice', 30)
   <!-- 此时, 返回的不是 Person 的实例对象, 而是 return 的对象 -->
   console.log(person) // { name: 'new name' }
   ```
### 实现手写 new 操作符
知道了 new 操作符具体做了什么，我们就可以自己实现一个 new 操作符了。
```
function myNew(constructor, ...args) {
  const obj = {}
  obj.__proto__ = constructor.prototype
  const result = constructor.apply(obj, args)
  return result instanceof Object ? result : obj
}
```
测试手写的myNew函数
1. 构造函数中无返回值
```
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
}

const person = myNew(Person, 'Alice', 30)
console.log(person) // Person { name: 'Alice', age: 30 }
person.greet() // Hello, my name is Alice and I'm 30 years old.
```

2. 构造函数返回非对象
```
function Person(name, age) {
  this.name = name
  this.age = age
  return 666
}
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
}

const person = myNew(Person, 'Alice', 30)
console.log(person) // Person { name: 'Alice', age: 30 }
person.greet() // Hello, my name is Alice and I'm 30 years old.

```
3. 构造函数返回对象
```
function Person(name, age) {
  this.name = name
  this.age = age
  return {
    school: 'school',
  }
}
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
}

const person = myNew(Person, 'Alice', 30) 
console.log(person) // { school: 'school' }
// person.greet()  // TypeError: person.greet is not a function
```

