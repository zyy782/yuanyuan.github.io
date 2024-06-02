/**
 * 元组(表示一个已知元素数量和类型的数组，各元素的类型不必相同)
 *   - 通过元组可以存储不同类型的元素，而非像数组那样只能存储相同元素类型（any[] 除外）。
 *   - 元组声明和赋值后，不能像列表一样添加、删除和修改元素，也就是说元组在程序运行过程中不能被修改
 *   - 要注意元组的越界问题，虽然可以越界添加元素（不建议），但是不可越界访问
 *   - 元组类型允许在元素类型后缀一个 ? 来说明元素是可选的
 */

let x1: [string, number, number, boolean]
x1 = ['age', 10, 3, true]
console.log(x1[0], x1[3])


// 可选元素必须在必选元素的后面，也就是如果一个元素后缀了 ?号，其后的所有元素都要后缀 ?号
let x2: [string, boolean?, number?]
x2 = ['zyy']
// let x3: [string, boolean]
// x3 = ['zyy'] // 不能将类型“[string]”分配给类型“[string, boolean]”。源具有 1 个元素，但目标需要 2 个。




/**
 * Never(表示那些永远不存在的类型)
 *   - never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型 是never的子类型 或 可以赋值给never类型（除了never本身之外），
 *     即使 any也不可以赋值给never。
 */

//返回never的函数必须存在无法达到的终点(不能return)
function test(name: string): never {
  // return name // 不能将类型“string”分配给类型“never”。
  throw new Error(name)
}



/**
 * Object
 * 
 */

// 这里的 | 用于创建联合类型，表示一个值的类型可以是多个类型之一。
function objectFunc(a: Object | String): void {
  console.log(a)
}
console.log(objectFunc({ name: 'zyy' }), objectFunc('zyy1')) // { name: 'zyy' }   zyy1




/**
 * --strictNullChecks标记(严格空格检查)
 *    -可以通过在命令行上添加--strictNullChecks参数来启功严格空值检查
 *    -也可以在项目的tsconfig.json文件中启用strictNullChecks编译器选项。
 *    -在严格空值检查模式下，null和undefined无法赋值给其他类型的变量
 */




/**
 * 类型断言
 *    -尖括号<>
 *    -as
 *     两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；但在TypeScript里使用JSX时，只有 as语法断言是被允许的
 */

let testStr: any = 'for test'
// let testStrLength: Number = (<String>testStr).length
let testStrLength: Number = (testStr as string).length
console.log("testStrLength", testStrLength) // testStrLength 8