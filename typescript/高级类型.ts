/**
 * 1. 交叉类型 &
 *    -- 交叉类型是将多个类型合并为一个类型
 */



/**
 * 2. 联合类型 |
 *    -- 联合类型表示一个值可以是几种类型之一
 */
function padLeft(value: string, padding: string | number) {
  console.log(value, padding)
}

console.log(padLeft("Hello world", 444), padLeft("Hello world", 'ts'))



/**
 * 3. 类型保护与区分类型
 * 
 */