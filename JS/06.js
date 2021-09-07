function clone(obj) {
    var _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone;
}
const res = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    sayhi() {
        console.log("hi")
    }
};

// 无法实现对对象中方法的深拷贝
console.log(clone(res))