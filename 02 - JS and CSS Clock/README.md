# day2 Javascript CSS clock
18/3/30

## 思路
- 获取当前时间
- 根据时间对指针映射
- 通过css的transform: rotate(deg)调整指针位置


## 知识点
- border-radius: 50%;  通过设置圆角的方式把正方形设置成圆形
- box-shadow     对元素设置多阴影，用','隔开，inset表示内阴影
    >  box-shadow: h-shadow v-shadow blur spread color inset;
    h-shadow	必需。水平阴影的位置。允许负值。	
| v-shadow	| 必需。垂直阴影的位置。允许负值。	|
| blur	| 可选。模糊距离。	|
| spread  |	可选。阴影的尺寸。	|
| color |	可选。阴影的颜色。请参阅 CSS 颜色值。	|
| inset	| 可选。将外部阴影 (outset) 改为内部阴影。|

- transition-timing-function: cubic-bezier(0, 1.74, 0.26, 0.99);  [贝塞尔曲线](https://blog.csdn.net/zhaozjc112/article/details/52909172)
- transform-origin: 100%; 默认旋转中心为center，通过此属性设置旋转中心为最右侧，也可设置为：right

## 关键代码

```
    const hourHand = document.querySelector('.hour-hand');
    const minHand = document.querySelector('.min-hand');
    const secondHand = document.querySelector('.second-hand');

    function setDate() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds(); //获取当前时间的时分秒

      const secondDegree = (seconds / 60) * 360 + 90;  /*秒针需要旋转的度数*/
      const minDegree = ((minutes / 60) * 360 + (seconds / 60) * 6) + 90;
      const hourDegree = ((hours / 12) * 360 + (minutes /60) * 30) + 90;

      hourHand.style.transform = `rotate(${hourDegree}deg)`;
      minHand.style.transform = `rotate(${minDegree}deg)`;
      secondHand.style.transform = `rotate(${secondDegree}deg)`;
    }
    setInterval(setDate, 1000);
```

- new Date获取时间，getHours等函数获取时，分，秒
- rotate设置旋转的度数
- setInterval每1s调用一下setDate函数

**当指针指向12时，指针会骤变**
解决方法：
这个方法是参考网上的解决方案。问题是由角度所引发的，那么就在角度这里想办法解决。

此前的代码中，每秒都会重新 new 一个 Date 对象，用来计算角度值，但如果让这个角度值一直保持增长，也就不会出现逆时针回旋的问题了。

因此，只在页面第一次加载时 new 一次 Date 对象，此后每秒直接更新角度值。

```
let secondDeg = 0,
minDeg = 0,
hourDeg = 0;

function initDate() {
    const date = new Date();
    const second = date.getSeconds();
    secondDeg = 90 + (second / 60) * 360;
    const min = date.getMinutes();
    minDeg = 90 + (min / 60) * 360 + ((second / 60) / 60) * 360;
    const hour = date.getHours();
    hourDeg = 90 + (hour / 12) * 360 + ((min / 60) / 12) * 360 + (((second / 60) / 60) / 12) * 360;
}

function updateDate() {
    secondDeg += (1 / 60) * 360;
    minDeg += ((1 / 60) / 60) * 360;
    hourDeg += (((1 / 60) / 60) / 12);

    secHand.style.transform = `rotate(${ secondDeg}deg)`;
    minHand.style.transform = `rotate(${ minDeg }deg)`;
    hourHand.style.transform = `rotate(${ hourDeg }deg)`;
}

initDate();
setInterval(updateDate, 1000);
```