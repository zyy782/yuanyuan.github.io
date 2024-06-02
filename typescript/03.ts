/**
 * 接口
 * 
 */

// 定义接口,必须包含一个label属性且类型为string
interface labelValue {
  label: string,
  // age?:number
}
function test(obj:labelValue): any {
  return obj.label
}
let testObj = { label: 'ZYY', age: 10 }
console.log(test(testObj)) // ZYY


// 只读属性
interface test1 {
  readonly name: string,
  readonly age: number
}
let person1: test1 = {
  name: 'zyy',
  age: 18
}

// person1.age = 20 //无法为“age”赋值，因为它是只读属性
console.log("person1", person1)



// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
// 创建一个只读数组，一旦创建不可改变
let test2: ReadonlyArray<number> = [1, 2, 3, 4]
// test2[0] = 9 // 类型“readonly number[]”中的索引签名仅允许读取

let test3: number[] = [5, 6, 7, 8]
test3[0] = 10
let test4: ReadonlyArray<number> = test3
// test4[1] = 10 // 类型“readonly number[]”中的索引签名仅允许读取。

console.log("test2", test2, 'test3', test3, 'test4', test4) //test2 [ 1, 2, 3, 4 ] test3 [ 10, 6, 7, 8 ] test4 [ 10, 6, 7, 8 ]

// test3 = test4 // 类型“readonly number[]”中的索引签名仅允许读取。
// 断言重写
test3 = test4 as number[]



/**
 * 类
 *   这个类有3个成员：一个叫做 greeting的属性，一个构造函数和一个 greet方法。
 *   - 构造函数：
 *            每当使用new关键字创建一个对象时，构造函数就会被调用。例如：
 *            let greeterTest = new Greeter("world");; 会调用Greeter类的构造函数，world就是这个构造函数的入参。
 *   - public private protected
 *   - getter setter
 */
class Greeter {
  greeting: string;
  constructor(message: string) {
    // this关键字指向的是当前正在被创建的对象实例
    this.greeting = message;
  }
  greet() {
      return "Hello, " + this.greeting;
  }
}

let greeterTest = new Greeter("world");


class Animal {
  name: String;
  constructor(str: String) {
    this.name = str
  }
  move() {
    console.log('I am ' + this.name + ', I can move')
  }
}

class Dog extends Animal {
  bark(type:string) {
    console.log(type)
  }
}

const Animal1 = new Dog('wangCai')
console.log(Animal1.name)
Animal1.bark('wang wang wang')
Animal1.move()

// 派生类包含了一个构造函数，它 必须调用 super()，它才会执行基类的构造函数。
class Cattle extends Dog{
  constructor(name: String) {
    super(name)
  }
  say() {
    super.bark('mou mou')
  }
  // 重写父类的bark方法
  bark(type:string) {
    // 在构造函数里访问 this的属性之前，我们 一定要调用 super()
    console.log("Hello, I am " + this.name, '-' + type)
  }
}
const animal2 = new Cattle('小牛')
animal2.bark('mou mou') // Hello, I am 小牛 -mou mou


const qiuyulun: Animal = new Dog('QQ')
qiuyulun.move() // I am QQ, I can move



// public公开   private私密   protected派生类可访问

class Employee {
  private name: string;
  public age?: number;
  constructor(theName: string, theAge: number) {
    this.name = theName;
    this.age = theAge
  }
  protected say() {
    console.log("Hello, i am " + this.name, 'i am ' + this.age)
  }
}
class Emp extends Employee {
  constructor(theName: string, theAge: number) {
    super(theName,theAge)
  }
  public sayE() {
    this.say()
  }
}
let employee1 = new Employee("Bob", 12);
let employee2 = new Emp('Amy', 80)
console.log(employee1.age)
// employee1.say() // error: 属性“say”受保护，只能在类“Employee”及其子类中访问
// employee2.say() // error: 属性“say”受保护，只能在类“Employee”及其子类中访问
employee2.sayE() // Hello, i am Amy i am 80




// 类的静态成员
class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));




// 抽象类
// 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
abstract class Department {

  constructor(public name: string) {
  }

  printName(): void {
      console.log('Department name: ' + this.name);
  }

  // 抽象类中的 抽象方法 不包含具体实现 并且 必须在派生类中实现
  abstract printMeeting(): void;
}

class AccountingDepartment extends Department {

  constructor() {
      super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
      console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
      console.log('Generating accounting reports...');
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在







// 接口可以继承自类
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  } 
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
console.log(point3d.x,point3d.y,point3d.z)