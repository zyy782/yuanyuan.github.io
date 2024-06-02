/**
 * 接口
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function test(obj) {
    return obj.label;
}
var testObj = { label: 'ZYY', age: 10 };
console.log(test(testObj)); // ZYY
var person1 = {
    name: 'zyy',
    age: 18
};
// person1.age = 20 //无法为“age”赋值，因为它是只读属性
console.log("person1", person1);
// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
// 创建一个只读数组，一旦创建不可改变
var test2 = [1, 2, 3, 4];
// test2[0] = 9 // 类型“readonly number[]”中的索引签名仅允许读取
var test3 = [5, 6, 7, 8];
test3[0] = 10;
var test4 = test3;
// test4[1] = 10 // 类型“readonly number[]”中的索引签名仅允许读取。
console.log("test2", test2, 'test3', test3, 'test4', test4); //test2 [ 1, 2, 3, 4 ] test3 [ 10, 6, 7, 8 ] test4 [ 10, 6, 7, 8 ]
// test3 = test4 // 类型“readonly number[]”中的索引签名仅允许读取。
// 断言重写
test3 = test4;
/**
 * 类
 *   这个类有3个成员：一个叫做 greeting的属性，一个构造函数和一个 greet方法。
 *   - 构造函数：
 *            每当使用new关键字创建一个对象时，构造函数就会被调用。例如：
 *            let greeterTest = new Greeter("world");; 会调用Greeter类的构造函数，world就是这个构造函数的入参。
 *   - public private protected
 *   - getter setter
 */
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        // this关键字指向的是当前正在被创建的对象实例
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeterTest = new Greeter("world");
var Animal = /** @class */ (function () {
    function Animal(str) {
        this.name = str;
    }
    Animal.prototype.move = function () {
        console.log('I am ' + this.name + ', I can move');
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function (type) {
        console.log(type);
    };
    return Dog;
}(Animal));
var Animal1 = new Dog('wangCai');
console.log(Animal1.name);
Animal1.bark('wang wang wang');
Animal1.move();
// 派生类包含了一个构造函数，它 必须调用 super()，它才会执行基类的构造函数。
var Cattle = /** @class */ (function (_super) {
    __extends(Cattle, _super);
    function Cattle(name) {
        return _super.call(this, name) || this;
    }
    Cattle.prototype.say = function () {
        _super.prototype.bark.call(this, 'mou mou');
    };
    // 重写父类的bark方法
    Cattle.prototype.bark = function (type) {
        // 在构造函数里访问 this的属性之前，我们 一定要调用 super()
        console.log("Hello, I am " + this.name, '-' + type);
    };
    return Cattle;
}(Dog));
var animal2 = new Cattle('小牛');
animal2.bark('mou mou'); // Hello, I am 小牛 -mou mou
var qiuyulun = new Dog('QQ');
qiuyulun.move(); // I am QQ, I can move
// public公开   private私密   protected派生类可访问
var Employee = /** @class */ (function () {
    function Employee(theName, theAge) {
        this.name = theName;
        this.age = theAge;
    }
    Employee.prototype.say = function () {
        console.log("Hello, i am " + this.name, 'i am ' + this.age);
    };
    return Employee;
}());
var Emp = /** @class */ (function (_super) {
    __extends(Emp, _super);
    function Emp(theName, theAge) {
        return _super.call(this, theName, theAge) || this;
    }
    Emp.prototype.sayE = function () {
        this.say();
    };
    return Emp;
}(Employee));
var employee1 = new Employee("Bob", 12);
var employee2 = new Emp('Amy', 80);
console.log(employee1.age);
// employee1.say() // error: 属性“say”受保护，只能在类“Employee”及其子类中访问
// employee2.say() // error: 属性“say”受保护，只能在类“Employee”及其子类中访问
employee2.sayE(); // Hello, i am Amy i am 80
// 类的静态成员
var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid1 = new Grid(1.0); // 1x scale
var grid2 = new Grid(5.0); // 5x scale
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
// 抽象类
// 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log('Department name: ' + this.name);
    };
    return Department;
}());
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment() {
        return _super.call(this, 'Accounting and Auditing') || this;
    }
    AccountingDepartment.prototype.printMeeting = function () {
        console.log('The Accounting Department meets each Monday at 10am.');
    };
    AccountingDepartment.prototype.generateReports = function () {
        console.log('Generating accounting reports...');
    };
    return AccountingDepartment;
}(Department));
var department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在
// 接口可以继承自类
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var point3d = { x: 1, y: 2, z: 3 };
console.log(point3d.x, point3d.y, point3d.z);
