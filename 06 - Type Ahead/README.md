# day06 Type Ahead
18/6/5
##数据请求
```
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
```
###Fetch API
[fetch api](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
fetch() 必须接受一个参数——资源的路径。无论请求成功与否，它都返回一个 promise 对象，resolve 对应请求的 Response。你也可以传一个可选的第二个参数init（参见 Request）。
Fetch API 的基本语法如下： fetch(input, init).then(function(response) { ... });

更详细的Fetch API的相关内容，请参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)。

###获取body的方法
在这个挑战中，我们主要是利用 .json()，以使用 JSON 对象来读取 Response 流中的数据，读取之后，Body 的 body.Uesd 属性值会变为已读。另外较为常用的方法还有：blob()、text()、arrayBuffer()、formData()。
[关于body API的介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/Body)
通过请求获取到数据后，将其存在cities[]数组中，以便后续使用。由于我们在.then(dta)中获取到的data已经是一个数组，我们想要把他存储在cities[]数组中,使用了ES6 中的数组扩展语法。

###数组扩展语法
扩展语法允许在需要多个参数（用于函数调用）或多个元素（用于数组文本）或多个变量（用于解构分配）的位置扩展表达式。 基本语法如下：myfunc(...iterableObj),也可用于数组字面量，用法如下：[...iterableObj,4,5,6]。 更详细的关于扩展语句的相关内容，建议参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)。


##数据处理
```
function findCity(searchString,cities){
  const regx = new RegExp(searchString,'gi');
  //return cities.filter(item => item.city.includes(searchString) || item.state.includes(searchString));
  return cities.filter(item => (item.city.search(regx) !== -1) || (item.state.search(regx) !== -1));
}
```
###js的正则表达式
使用 RegExp 对象
在 JavaScript 中，RegExp 对象是一个预定义了属性和方法的正则表达式对象。
此处使用了正则表达式进行匹配，.search(RegExp)，若查找不到则返回-1,否则返回字符串中第一次出现满足正则表达式的位置下标。

对于cities[]数组来说，则使用.filter()方法，返回满足条件的项。
[更多关于正则表达式](http://www.runoob.com/js/js-regexp.html)

##数据展示
```
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function displayCity(){
  const searchRusult = findCity(this.value,cities);
  const regx = new RegExp(this.value,'gi');
  const dom = searchRusult.map(item => {
    const city = item.city.replace(regx,`<span class="hl">${this.value}</span>`);
    const state = item.state.replace(regx,`<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${city},${state}</span>
        <span class="population">${numberWithCommas(item.population)}</span>
      </li>
      `;
      }).join('');
  suggestions.innerHTML = dom;
  if(this.value == ''){
    suggestions.innerHTML = `
    <li>Filter for a city</li>
      <li>or a state</li>`;
  }
}
```

通过findCity(searchString,cities)方法返回满足条件的城市字符串数组，并对查找字符串进行格式化，添加.hl类，此处使用正则表达式进行替换，.replace(RegExp,newString),可以将满足正则表达式的字符串替换为新的字符串，此处也使用了ES6的模版字符串。

findCity(searchString,cities)返回的是一个数组，我们将数组中的每一项映射为可以插入文档中的HTML代码，也即<li> <span class="name">${city},${state}</span> <span class="population">${numberWithCommas(item.population)}</span> </li>，再使用数组的.join('')方法可以将数组的每一项连接为一个字符串，.join('')需要一个连接符，默认是','(逗号),如果想要平滑连接的话，其参数不能省略不填，应填'',否则按默认处理。

还有对右侧人口数字的格式化处理，三位数字用一个','(逗号)隔开，仍采用正则表达式的.replace(RegExp,newString)方法实现，具体见numberWithCommas(x)函数。

最后将其插入到DOM文档中即可。

##事件监听
```
const searchContent = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
searchContent.addEventListener('change',displayCity);
searchContent.addEventListener('keyup',displayCity);
```

最后就是要对DOM节点进行监听，同时监听input框的change事件和keyup事件，就可以实时的输出最新的结果。