flex
 flex-grow: 弹性扩展  默认值 0
 flex-shink：弹性收缩 默认值 1
 flex-basis：基础尺寸 默认值 auto

flex: 0 1 auto

#### flex 只有一个值
+ 该值为 一个无单位数  
   flex: 数字，表示 flex-shink: 数字，flex-basis：0%    
   注意，这里的 flex-basis 的值是 0，而不是默认值 auto
+ 该值为宽度值px
  例如 flex: 100px，表示flex-basis: 100px，flex-grow: 1, 和flex-shrink: 1
  注意，这里的 flex-grow 的值是 1，而不是默认值 0
+ 该值为关键字 none / auto / initial
#### flex 有两个值
如果 flex 的属性值有两个值，则第 1 个值一定是 flex-grow , 第二个值如果为：
   1. 无单位数字，表示 flex-shrink
      例如flex: 1 2，则这个 2 表示 flex-shrink，此时 flex-basis 的值为 0%，而非默认值 auto
   2. 长度值px，表示 flex-basis
      例如flex: 1 100px，则这个 100px 值 flex-basis，此时 flex-shrink 默认值为 0


[!!!!](https://zhuanlan.zhihu.com/p/491582103)