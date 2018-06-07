# day08 Fun with HTML5 Canvas
18/6/7

##Canvas
<canvas>可以使用Javascript来绘制图形。
首先获取页面Canvas元素，并初始化设置如下：
```
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;
```

* canvas.getContex(contextType, contextAttributes);返回canvas的上下文，若没有定义上下文的话返回null，该方法有两个参数：
    + contextType代表*上下文类型*,可能取值为：
        - 2d：       代表二维渲染
        - webg1:     代表三维渲染上下文对象，只能在浏览器实现WebGL 版本1
        - webg2:     代表三维渲染上下文对象，只能在浏览器实现WebGL 版本2
        - bitmaprenderer 会创建一个ImageBitmapRenderingContext，只提供功能去替换指定canvas的ImageBitmap内容。
    + contextAttributes 代表*上下文属性* [MDN参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext)
* ctx.strokeStyle是Canvas 2D API描述画笔（绘制图形）颜色或者样式的属性，默认值为#000(black)
* ctx.lineJoin是Canvas 2D API用来设置2个长度不为0的相连部分(线段，圆弧，曲线)如何链接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。如果两个线段的相连部分在同一方向则此属性不会产生任何效果。可以取值如下：
    + round     ：通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。圆角的半径是线段的宽度。
    + bevel     ：在相连部分的末端填充一个额外的以三角形为底的区域。
    + miter(默认值) ：通过延伸相连部分的外边缘，使其相交与一点，形成一个额外的菱形区域。这个设置可以通过miterLimit属性看到效果。
* ctx.lineCap是Canvas 2D API 指定如何绘制每一条线段末端的属性，可以取值如下：
    + round         :末端以圆形结束
    + butt（默认值） ：末端以方向结束
    + square        ：末端以放心结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。
+ ctx.ineWidth是Canvas 2D API 设置线段厚度的属性，默认是1.0.赋值时0、负数、infinity和NaN都会被忽略。

##画线
```
let isDrawing = true;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e){
  if(!isDrawing) return;
  let lineX = e.offsetX;
  let lineY = e.offsetY;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX,lastY);
  ctx.lineTo(lineX,lineY);
  ctx.stroke();
  [lastX,lastY] = [e.offsetX,e.offsetY];
  hue++;
  if(direction){
    ctx.lineWidth--;
  }else{
    ctx.lineWidth++;
  }

  if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  
  hue %= 361;
}
```

* 想要划线的话就要清楚以下几件事：线段的起点是哪里、线段的终点是哪里、怎样是画线的状态（按下鼠标移动画线，松开鼠标画线结束），因此需要初始化一下变量：

```
let isDrawing = true; //代表是否正在画线的flag
let lastX = 0; //线段的起点X坐标
let lastY = 0; //线段的起点Y坐标
let hue = 0; //标识线段颜色（hsl颜色表示法）
let direction = true; //线段的粗细变化flag
```

* 使用canvas进行画线，使用 beginPath()开始绘制新的路径，使用 moveTo()移动画笔至路径的起始点，使用lineTo标识路径的终点，使用 stroke() 方法真正地画线。

    + ctx.beginPath()  通过清空格子路径列表开始一个新路径的方法。当你想创建一个新的路径时，调用此方法。
    + ctx.moveTo(x,y)  将一个新的子路径的起始点移动到x,y
    + ctx.lineTo(x,y)   使用直线连接子路径的终点到x,y坐标（并不会真正的绘制）
    + ctx.stroke()  使用非零环绕规则，根据当前的画线样式，绘制当前或已经存在的路径
    + ctx.closePath() 将笔点返回到当前子路径起始点的方法。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。（此例中未用到）
* 颜色变化：使用hsl颜色表示，hue的值可以从0-360 
* 线条粗细的变化
* 事件监听