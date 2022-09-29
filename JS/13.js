function tranferWeekday(day) {
    const map = {
      1: '星期一',
      2: '星期二',
      3: '星期三',
      4: '星期四',
      5: '星期五',
      6: '星期六',
      7: '星期日',
    }
  
    return map[day] ?? '不要开玩笑，没有这个日子哦~'
  }
let res = tranferWeekday(9)
console.log(res)


let n = 3;
(n == 1) && console.log(1);
(n == 2) && console.log(2);
(n == 3) && console.log(3);
( ! n ) && console.log("null");
// 如果读取对象内部的某个属性，往往需要判断一下，属性的上层对象是否存在
// name在第5层，所以要判断5次
let obj = {
    a: {
        b: {
            c: {
                name: 'ccc'
            }
        }
    }
}
// let objname = obj&&obj.a&&obj.a.b&&obj.a.b.c&&obj.a.b.c.name || 'defauleName';
let objname = obj?.a?.b?.c?.name
console.log(objname)

// let currentTopLevel = '3'
// function currentLevel() {
//     if (currentTopLevel === '1') {
//       return '白银会员';
//     } else if (currentTopLevel === '2') {
//       return '黄金会员';
//     } else if (currentTopLevel === '3') {
//       return '铂金会员';
//     } else if (currentTopLevel === '4') {
//       return '黑金会员';
//     } else if (currentTopLevel === '5') {
//       return '钻石会员';
//     } else {
//       return '黑钻会员';
//     }
//   }
//   console.log(currentLevel(3)) // 铂金会员
//   function newcurrentLevel(currentTopLevel) {
//     const map = {
//         '1': '白银会员',
//         '2':'黄金会员',
//         '3':'铂金会员',
//         '4':'黑金会员',
//         '5':'钻石会员',
//     }
//     return map[currentTopLevel] ?? '黑钻会员'
//   }
//   console.log(newcurrentLevel(6)) // 黑钻会员

  