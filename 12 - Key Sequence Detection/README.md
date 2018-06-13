# day12 key sequence detection
按键按下的序列侦查，比如我们预设一个字符串“haha”，只要用户在浏览器中按顺序按下这四个字母，就可以触发所绑定的事件，这个功能也经常被公司在浏览器中为用户埋下小的把戏和惊喜。

## 实现思路
* 首先为整个文档绑定keyup事件，监听用户的键盘操作，当用户按下键盘松开时，触发此事件，根据e.key可以获得这次按下的是什么按键。
* 实现绑定的事件，将用户输入的字符序列存入数组中，并截取最后
几个输入的和预设字符串相同长度的字符串，将两者进行比较，相同则触发trick。

## 代码
```
  const candidateCode = [];
  const secretCode = 'iamboss';
  window.addEventListener('keyup',e => {
    candidateCode.push(e.key);
    candidateCode.splice(-secretCode.length-1,candidateCode.length-secretCode.length);
    if(candidateCode.join('').includes(secretCode)){
      alert('awesome!');
    }
    console.log(candidateCode);
```

## 截取字符串
在将用户按下的按键获取到后，存储到一个数组中，通过candidateCode.splice()截取字符串，需要删去前面的所有字符，只保留最后的几个字符，长度为secretCode字符串的长度，因此此时第一个参数可以设为0代表从第一个字符开始删除，也可以设置为-secretCode.length-1，第一个参数为负数，代表从后往前数，数到的位置作为删除的起始点，-secretCode.length的长度会数到第二个值，因为字符串数组的下标是从0开始索引的，所以要想从第1个开始删除，需要再-1。 第二个参数是欲删除字符的个数，因为我们要留下和secretCode长度相同的字符串，因为应该删除前面所有的字符，也就是输入字符串的长度-secretCode的长度，即candidateCode.length - secretCode.length。

## 判断是否相同
当截取了和secretCode相同长度的字符串后，就要判断两者是否相同，通过调用String.prototype.includes()方法，若一个字符串中包含另一个字符串，返回true，否则返回false。当返回true的时候触发trick。

还记得上一篇提到的使用&&运算符优化代码的方法么？ 当&&的左边为true是才会继续执行&右边的表达式。 因此这一例也可以这样写：candidateCode.join('').includes(secretCode) && alert('awesome！')