/**
 * 1、什么是泛型
 *   顾名思义，泛指的类型。用于规定参数返回值是同一种类型，但不要求必须是某种类型的情况
 *   下方的back函数就叫做泛型，因为它可以适用于多个类型。 不同于使用 any，它不会丢失信息，传入什么类型就返回什么类型。
 *    
 */

// function back<T>(arg: T):T{
//   return arg
// }
// <T> 声明了泛型函数   (arg: T): T 描述了函数的输入和输出。arg 是一个类型为 T 的参数，函数返回值也是类型为 T。
const back = <T>(arg: T):T =>{
  return arg
}


/**
 * 2、使用泛型函数
 */
const result1 = back<number>(20) // 传入所有的参数
const result2 = back(20) // 使用类型推断
console.log(result1, result2)


/**
 * 3、泛型类型
 *    泛型函数的类型 与 非泛型函数的类型 没什么不同，只是有一个 类型参数 在最前面，像函数声明一样
 */
function identity<T>(arg: T): T {
  return arg
}
let myIdentify1: <T>(arg: T) => T = identity
console.log(myIdentify1('test'))
// 也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以
let myIdentify2: <U>(arg: U) => U = identity
// 还可以使用带有调用签名的对象字面量来定义泛型函数
let myIdentity3: { <T>(arg: T): T } = identity;


/**
 * 4. 泛型接口
 */
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function test<T>(arg: T):T {
  return arg
}
let myTest: GenericIdentityFn = test
console.log('myTest', myTest(666))

// 把泛型参数当作整个接口的一个参数。 这样我们就能清楚的知道使用的具体是哪个泛型类型
interface GenericIdentityFn2<T> {
  (arg: T): T
}
// function test44<T>(arg: T): T {
//   return arg
// }
const test44 = <T>(arg: T): T => {
  return arg
}
let myTest2: GenericIdentityFn2<string> = test44
console.log('myTest2', myTest2('test'))
// console.log('myTest2', myTest2(888))//类型“number”的参数不能赋给类型“string”的参数


/**
 * 5. 泛型类
 *   - 与接口一样，直接把泛型类型放在类后面，
 *     可以帮助我们确认类的所有属性都在使用相同的类型。
 *   - 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型
 */
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x: number, y: number) {
  return x+y
}
console.log(myGenericNumber.add(6, 6)) //12


/**
 * 6. 泛型约束
 */
// 不能确定传入的类型有length属性
// function loggingIdentity<T>(arg: T): T {
//   console.log(arg.length);  // Error: T doesn't have .length
//   return arg;
// }
interface Lengthwise {
  length: number;
}
// 定义一个继承自上面的接口的泛型类型
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// 泛型函数被定义了约束，因此它不再是适用于任意类型,我们需要传入符合约束类型的值，必须包含必须的属性：
// console.log(loggingIdentity<number>(45)) error:类型“number”不满足约束“Lengthwise”
// loggingIdentity({ name: 'zhangyy'}) error: 对象字面量只能指定已知属性，并且“name”不在类型“Lengthwise”中
loggingIdentity({ length: 10, value: 3 }) //10


/**
 * 7.在泛型约束中使用类型参数
 */

// T 和 K 都是泛型参数，分别代表对象的类型和键的类型。这使得 getProperty 函数能够处理任意类型的对象和键。但下面的写法会报错，因为缺少了泛型约束以确保 key 是 obj 类型的属性
// function getProperty(obj: T, key: K) {
//   return obj[key];
// }

// <T, K extends keyof T> 给T和K增加了约束， 这意味着 K 必须是 T 的键类型。
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
let y = { a: 1, b: 2, c: 3, d: 4 };
let y1 = { 'name': 'jony', "age": 18 }
console.log(getProperty(y, "a"), getProperty(y1, "name"))  // 1 'jony'


/**
 * 8. 在泛型里使用类类型
 *    - 比如创建一个工厂函数,用于创建指定类的新实力
 */
// 接收 一个类型参数 T 和 一个构造函数对象 c 。构造函数对象必须具有无参数的构造方法 new(): T，这意味着当调用 new c() 时，它将返回一个类型为 T 的新实例。
function create<T>(c: {new(): T; }): T {
  return new c();
}
class Person {
  name: string;
  constructor() {
    this.name = 'zhangyy'
  }
}
const person01 = create(Person)
const person02 = new Person()
person01.name = '胡图图'
console.log('person01: ', person01.name, 'person02: ', person02.name)
// person01:  胡图图  person02:  zhangyy