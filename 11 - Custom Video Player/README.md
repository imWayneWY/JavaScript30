# day11 Custom Video Player
18/6/12

## 变量绑定
```
// 获取所有的页面元素
let video = document.querySelector('.viewer');
let progress = document.querySelector('.progress');
let toggle = document.querySelector('.toggle');
let player__slider = document.querySelectorAll('.player__slider');
let skip = document.querySelectorAll('[data-skip]');
let filled = document.querySelector('.progress__filled');
let progressBar = document.querySelector('.progress');
```

# 函数实现
* 视频播放与暂停转换函数
```
function videoplay(e){
    const method = video.paused? 'play' : 'pause';
    video[method];
}
```

分别调用video.play()和video.pause()函数。此处使用video[play]()和video[pause]()是因为使用中括号能动态传递变量进去

* 播放按钮状态显示函数
```
function handleToggle(){
    let icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
```

* 音量大小和播放速度控制函数
```
function handlePlayerSlider(e){
    video[e.target.name] = e.target.value;
}
```

对应HTML中
```
input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
```
分别给每个范围设置一个name属性

* 快进快退函数
```
function handleSkip(e){
    let skiptime = parseFloat(this.dataset.skip);
    video.currentTime += skiptime;
}
```
HTML对应代码
```
<button data-skip="-10" class="player__button">« 10s</button>
<button data-skip="25" class="player__button">25s »</button>
```

分别设置了data-skip属性，这样就可以通过.dataset.skip获取到该属性的值。但该值为字符串类型，需要用parseFloat()转换为float数值

* 进度条随播放时间而显示的函数
```
function filledUpdate(){
    let portion = parseFloat(video.currentTime / video.duration) * 100;
    filled.style.flexBasis = `${portion}%`;
}
```

flex-basis 属性用于设置或检索弹性盒伸缩基准值。。

注意：如果元素不是弹性盒对象的元素，则 flex-basis 属性不起作用。
flex-basis的含义(与width的区别)：flex items 在被放进一个flex容器之前的大小。也就是items理想或假设的大小。但是flex-basis不能保证其大小！一旦将items放入flex容器中，flex-basis的值就无法保证了。

* 拖动播放进度条
```
function handlefilled(e){
    let pice = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = pice;
}
```

[ffsetX、clientX和pageX等的区别](https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y)

## 事件监听
```
video.addEventListener('click',videoplay);
video.addEventListener('play',handleToggle);
video.addEventListener('pause',handleToggle);
video.addEventListener('timeupdate',filledUpdate);

toggle.addEventListener('click',videoplay);
toggle.addEventListener('click',handleToggle);

let mouseflag = false;
player__slider.forEach(item => item.addEventListener('click',handlePlayerSlider));
player__slider.forEach(item => item.addEventListener('mousedown',()=>mouseflag = true));
player__slider.forEach(item => item.addEventListener('mouseup',()=>mouseflag = false));
player__slider.forEach(item => item.addEventListener('mouseover',(e)=> mouseflag && handlePlayerSlider(e)));

skip.forEach(item => item.addEventListener('click',handleSkip));

let filledflag = false;
progressBar.addEventListener('click',handlefilled);
progressBar.addEventListener('mouseover', (e)=> filledflag && handlefilled(e));
progressBar.addEventListener('mousedown', ()=>filledflag=true);
progressBar.addEventListener('mouseup',()=>filledflag=false);


```

分别给页面元素建立事件监听，并绑定其实现函数即可。此处有两处需注意:

- 有实现进度条的点击拖拽，不能仅绑定mousemove事件，因为这样鼠标在上面滑过就会出发事件，还需判断鼠标是否点下，此处可设立一个布尔类型的flag标志鼠标是否按下，并分别绑定mouseup事件和mousedown事件，设置此flag的值，这样在mousemove事件的回调函数中先判断此flag的值，若为真是才继续触发事件。
- mousemove的回调函数本应如下:
```
｛
    if(filledflag){
        handlefilled(e);
    }
｝
```
但这样不够简洁，我们改进此代码如下：
```
filledflag && handlefilled(e)
```
使用&&判断左右两变量，只有两个都为真的时候整体表达式才为真，且在判断时从左向右依次判断，若左变量就为假，就不会再去执行右边的表达式。