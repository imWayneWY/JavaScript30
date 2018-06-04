#day05 Flex Panel Gallery
18/6/4

## flex相关属性
- display:flex; 设置该容器为flex容器
- flex: 1 0 auto; 三个值分别为flex-grow, flex-shrink和flex-basis的值
- flex-direction: column; 显示方向，按行显示为row
- align-items: center; 与显示方向垂直方向上flex元素内容的排列方式
- justify-content: center; 显示方向上flex元素的内容的排列方式
[查考指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## js
- this.classList.toggle('open'); 类名的切换，如果有.open类，就移除该类，反之亦然。
- transitionend 对每一个div监听transitionend事件，当.open类触发的动画结束后会同时触发该事件，通过event.propertyName可以得到以上动画的名称，但是在Safari浏览器中，event.propertyName === flex，在Chrome和Firefox浏览器中，event.propertyName === flex-grow，因此可以通过.includes('flex')方法，只要属性名中包含‘flex’字符串，就继续执行。
- 箭头函数和普通函数的区别
 不可以当做构造函数，也就是说，不可以使用 new 命令，否则会抛出错误。
 **this、arguments、caller等对象在函数体内都不存在。**所以本例中只能使用function
 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。