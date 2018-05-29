#Day01 - JavaScript Drum Kit
18/5/29

## 思路
- 监听keydown事件
- 按键被按下时，播放音效 audio.play()
- 按键被按下时，播放动画 Element.classList.add('className')
- 动画结束后，移除动画 Element.classList.remove('className')

## 知识点
- transform: scale(1.1);--该属性在键盘被点击时将该元素缩放至原来的1.1倍。
- .key{border: .4rem solid black;} .playing{border-color: #ffc600;}--这两条属性在按键点击的时候改变边框颜色。
- .key{text-shadow: 0 0 .5rem black;} .playing{box-shadow: 0 0 1rem #ffc600;}--这两条属性在按键点击的时候改变阴影的效果
- transition: all .07s ease;--定义以上动画在0.07秒内完成。
- data- 自定义数据属性，可以用dataset来访问

## 关键代码
### 按键监听，音效播放，添加动画
```
function playAudio(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if(!audio) return;
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if(!key) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}
window.addEventListener('keydown',playAudio);
```

- addEventListener 监听keydown 事件，触发playAudio函数
- document.querySelector函数选择element
- 如果不是有效按键，及时返回
- audio.currentTime = 0   重置音乐，否则连续敲击时候不再响了
- classList为元素添加playing类，触发css定义的效果

### 动画结束后移除动画
```
    function stopTransition(e){
        if(e.propertyName !== 'transform') return;
        e.target.classList.remove('playing');
    }
    const key = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('transitioned',stopTransition));
<
```
- 监听每一个按键元素的***transitionend***事件

> #### transform transition animation的区别
> transform 是实现的是元素的变形（静态）
> 主要使用有
> transform：translate() 平移 
> transform：rotate() 旋转 
> transform-origin: x, y 主要结合rotate来使用 规定旋转的中心点再哪 
> transform：scale() 缩放 
> transform：skew() 倾斜

> transition是实现的是动画的过程
> 主要使用有
> transition: all .5s ease-in-out 1s; 
> transition-property ：all | none | indent 属性改变时执行transition效果 
> transition-duration ：动画所需的时间 
> transition-timing-function 改变属性值的变换速率 
> transition-delay 动画延迟多久才开始

> animation是transition的一个拓展
> animation中增加了一个keyframes属性来定义动画的时间轴和关键帧 
> animation-name 绑定到选择器的 keyframe 名称 
> animation-duration 成动画所花费的时间 
> animation-timing-function 规定动画的速度曲线 
> animation-delay 规定在动画开始之前的延迟。 
> animation-iteration-count 规定动画应该播放的次数 
> animation-direction 规定是否应该轮流反向播放动画。

- **事件（event）的propertyName属性设置或返回元素的变化了的属性的名称**