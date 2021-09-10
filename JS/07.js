// Math.random() 生成一个在[0,1)之间的浮点随机数
// Math.random() * (max - min) + min; 生成一个在[min,max)之间的随机数
// console.log(parseInt(Math.random() * (53 - 1) + 1))
console.log(parseInt(Math.random() * (51 + 1), 10))

/***
 * 题目描述：
 * 将1-52，共52个数字 ，随机分为四个数组，每个数组有13个数字。输出最终结果
 */

function main() {
    const arr = [];
    let i = 1,
        a, b, c, d;
    while (i <= 52) {
        arr.push(i);
        i++;
    }
    var flagArr = []
    a = []
    b = []
    c = []
    d = []
    var setFlag = new Set()

    while (setFlag.size < 52) {
        var flag = parseInt(Math.random() * (51 + 1));
        if (setFlag.has(flag) == false) {
            setFlag.add(flag)
            flagArr.push(arr[flag])
        }
    }
    for (let i = 0; i < flagArr.length; i++) {
        if (i < 13) {
            a.push(flagArr[i])
        } else if (i < 26) {
            b.push(flagArr[i])
        } else if (i < 39) {
            c.push(flagArr[i])
        } else {
            d.push(flagArr[i])
        }
    }

    // console.log(indexFlag.sort(function(a,b){return a- b}))
    // console.log(flagArr.sort(function(a,b){return a- b}))
    console.log(a, b, c, d)
}
main()