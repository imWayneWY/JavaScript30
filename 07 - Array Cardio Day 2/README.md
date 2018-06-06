#day07 Array Cardio Day2
18/6/6

##some
.some(callback)函数测试数组中的每一项是否满足传入函数，只要有一项满足就返回true，否则返回false。 回调函数有三个参数，分别为currentValue，index，array,分别代表待传入的值，当前元素在数组中的下标，传入的数组。 在这里可以使用ES6的箭头函数对结果进行简化，如下：

##every
和some类似，.every(callback)函数测试数组中的每一项是否满足传入函数，只有所有的项都满足才返回true，否则返回false。 回调函数有三个参数，分别为currentValue，index，array,分别代表待传入的值，当前元素在数组中的下标，传入的数组。

##find
和filter类似，.find(callback)函数测试数组中的每一项是否满足传入函数，如果找到满足传入函数的值，就传回该值，否则返回undefined。 回调函数有三个参数，分别为currentValue，index，array,分别代表待传入的值，当前元素在数组中的下标，传入的数组。

##findIndex
.findIndex(callback)函数测试数组中的每一项是否满足传入函数，如果找到满足传入函数的值，就传回该值所在的下标，否则返回-1。 回调函数有三个参数，分别为currentValue，index，array,分别代表待传入的值，当前元素在数组中的下标，传入的数组。

##splice 和 slice
.splice()方法，是一个十分强大的方法，既可以删除一个数组中的若干项，也可以向数组中某个位置添加若干项，语法如下array.splice(start, [deleteCount], [item1, item2, ...]),start代表从什么位置开始改变这个数组，从0开始索引；deleteCount代表要删除的个数，可选的；[item1, item2, ...]代表向数组中添加的元素；若deleteCount=0,又有[item1, item2, ...]存在，就可以实现在指定位置添加元素的效果；如果deleteCount=(some number)，且无[item1, item2, ...]，就可以从数组中删除若干个元素。但是此方法是对原数组进行改变，经过.splice()方法处理后，原数组回丢失，因此再采用以下方法实现删除操作，而不损坏原数组。
```
const newComments = [
    ...comments.slice(0,findCommentIndex),
    ...comments.slice(findCommentIndex+1)
]; 
```
新建一个数组，从comments中剪切走需删除元素的前和后面的所有元素即可。在此新建的数组汇总加入两个数组，再用ES6的...扩展语法打开。