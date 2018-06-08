#day09 Dev Tools Domination
18/6/8

熟悉和掌握常见的console调试技巧
## 给页面添加断点
Elements选项卡中，喧选择页面的某个标签，右键-> Break on -> Attributes modifications。即可为该元素添加断点，当它的属性发生改变时，会自动定位到页面代码中的对应行。
## 更多用法
* console.log(string)直接将带输出的字符串传给.log()方法，这个最常用，也有其它方法如下：
    + %s: 字符串
    + %f: 浮点数
    + %o: 对象Object
    + %d: 整数
    + %c: 设定输出的样式，在之后的文字将按照第二个参数里的设置进行显示
例子如下：
```
console.log("I am a String: %s ", "log"); //log
console.log("I am a int number: %d ", 1); //1
console.log("I am a float number: %d ", 1.23); //1.23
console.log("%c different style", "color: #00fdff; font-size: 2em;");
```
* console.warn(String) 输出警告信息，Console面板上面在文字前面显示黄色警告图标：⚠️，点击该警告消息会出现当前的程序栈的状态。

* console.error(String) 输出错误信息，Console面板上面在文字前面显示红色错误图标：❌，点击该错误消息会出现当前的程序栈的状态。

* console.info(String) 输出常规信息，Console面板上面在文字前面显示蓝色图标：ℹ，点击该蓝色消息会出现当前的程序栈的状态。

## 打印DOM节点
* console.log(p); .log 输出这个 DOM 的 HTML 标签。
* console.dir(p); .dir 则会输出这个 DOM 元素的属性列表。

## 清空console面板
console.clear()

## console.asset
此方法接受一个表达式作为参数，如果参数返回值是 false，则会输出第二个参数中的内容。

## 打印表格
console.table

## 分组打印
```
const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];
dogs.forEach(dog => {
    console.group(`${dog.name}`);        
//  console.groupCollapsed(`${dog.name}`);  // 列表默认叠起状态
    console.log(`${dog.name}`);
    console.log(`${dog.age}`);
    console.log(`${dog.name} 有 ${dog.age} 岁了`);
    console.groupEnd();
});
```
});
group()方法中可以传入这个分组的名称。group()/groupCollapsed() 与 groupEnd() 之间的内容会自动分组，区别在于是否能自动折叠。

## console.count() 计数
## console.time() 计时
用 console.time("name") 和 console.timeEnd("name") 可以分别控制开始点和结束点，它们的参数表示当前计时的名称，可以自定义但前后必须保持相同。如下例子所示：
```
console.time('fetch my data');
fetch("https://api.github.com/users/soyaine")
  .then(data => data.json())
  .then(data => {
  console.timeEnd('fetch my data');
  console.log(data);
});
```
会打印输出fetch my data: *ms标签。