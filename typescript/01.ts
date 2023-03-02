let a: number = 6;
let a2: number = 0xf00d;
console.log(a, a2)

let str: string = 'typescript'

// let num: number[] = [1, 2, 3, 4]
let num:Array<number> = [1,2,3,4]
console.log(str, num[2])

// 元组
let x: [string, number]
x = ['num', 10]
console.log(x[1])

// 枚举
enum Color { Blue, Red, Green }
let b: Color = Color.Blue
// 默认情况下，从0开始为元素编号
console.log(b, Color.Red, Color.Green) // 0 1 2
// 可手动改变编号数值
enum Size { Small = 3, Middle = 6, Large }
console.log(Size.Small, Size.Middle, Size.Large) // 3 6 7
// 通过枚举的编号获取值
console.log(Size[7]) // Large


// Any
// 在编程阶段还不清楚类型的变量
let notSure: any = '888' 
notSure = 888
console.log(typeof notSure) // number

//void
// 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型
function test(): void {
  console.log('俺没有返回值')
}
test()