// TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式
function greeter(person: string) {
  return "Hello, " + person;
}

let user = "Jane User";

let res = greeter(user);
console.log(res)

// 接口
interface Person {
  firstName: string,
  lastName: string
}
function greeter2(person: Person) {
  return '你好啊' + person.firstName + ' ' + person.lastName
}
let userA = { firstName: 'Zhang', lastName: 'yuanyuan' }
console.log(greeter2(userA))
// 类
class Student {
  name: string;
  constructor(public firstName: string, public lastName: string) {
    this.name = firstName + ' ' + lastName
  }
}

let userB = new Student('zhang', 'yy')
console.log('userB', greeter2(userB))