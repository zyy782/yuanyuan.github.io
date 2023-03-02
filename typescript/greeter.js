// TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式
function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
var res = greeter(user);
console.log(res);
function greeter2(person) {
    return '你好啊' + person.firstName + ' ' + person.lastName;
}
var userA = { firstName: 'Zhang', lastName: 'yuanyuan' };
console.log(greeter2(userA));
var Student = /** @class */ (function () {
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = firstName + ' ' + lastName;
    }
    return Student;
}());
var userB = new Student('zhang', 'yy');
console.log('userB', greeter2(userB));
