# day03 CSS Variables
18/5/31

## 思路
- 首先在CSS中定义变量，并在页面样式中对页面变量进行关联
- 使用JS实时获取变量的值，并更新CSS属性

## CSS3
```
:root{   
        --base: #ffc600;
        --blur: 10px;
        --spacing: 10px;
    }
span.hl{
        color: var(--base);
    }
img{
        padding: var(--spacing);
        filter: blur(var(--blur));
        background: var(--base);
    }
```

- :root 表示文档树的根元素，应用到HTML， 除了优先级更高外，相当于html标签选择器[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)
- :root 在声明全局CSS变量的时候很有用，使用"--变量名"就可以自定义CSS全局变量。在使用CSS全局变量时，只需要将属性的值设置为var(--变量名)即可[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)
- filter: blur(); 是指滤镜，是一个功能强大的工具。可以一次设置一个滤镜也可以同时设置多个滤镜，常见的滤镜有模糊滤镜blur(),透明度滤镜opacity(),灰度滤镜grayscale()等。[参考文档](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

## JavaScript
```
const inputs = document.querySelectorAll('.controls input');
inputs.forEach(input =>  input.addEventListener('mousemove',updateData));
inputs.forEach(input =>  input.addEventListener('change',updateData));
function updateData(e){
    const suffix = this.dataset.sizing || ' ';
    document.documentElement.style.setProperty(`--${this.name}`,this.value + suffix);
}
```
- 为每一个.control input节点监听mousemove事件和change事件
- this.dataset.sizing 返回 data-sizing属性的值，dataset返回该元素所有自定义的data-的属性。
- 通过this.value获取的值不能直接设置为CSS属性，因为没有单位，但是--blue和--sapcing变量有属性，而--base属性没有，因此设置一变量保存他们的后缀作为单位，若无单位，则设置为空。即const suffix = this.dataset.sizing || ' ';，再通过this.value + suffix就可以正确的设置CSS属性的值。
- document.documentElement表示文档的根元素，对于HTML文档来说就是<html>。[参考文档](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
- 