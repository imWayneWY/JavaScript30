# day13 Slide in on Scroll

## 整体代码
```
    const sliderImages = document.querySelectorAll('.slide-in');
    function checkSlide(e){
      sliderImages.forEach(sliderimage => {
        //滑动到图片显示的一半
        const slideAt = window.innerHeight + window.scrollY - sliderimage.height/2;
        //图片底部距文档顶部的距离
        const imageBottom = sliderimage.offsetTop + sliderimage.height;
        //图片是否已经显示了一半
        const isHalfShown = slideAt > sliderimage.offsetTop;
        //图片是否已经被完全滚动出去
        const isNotScrolledPast = window.scrollY < imageBottom;
        if(isHalfShown && isNotScrolledPast){
          sliderimage.classList.add('active');
        } else {
          sliderimage.classList.remove('active');
        }
      });
    }
  window.addEventListener('scroll',debounce(checkSlide));
```

## 难点
* 首先获取触发动画的位置，在滚动到图片一半的位置时触发。 const slideAt = window.innerHeight + window.scrollY - sliderimage.height/2;
- window.innerHeight表示浏览器的内部视图窗口的高度值
- window.scrollY表示浏览器当前的在Y轴上滚动的距离（未滚动时值为0），也可通过采用window.scroll(X,Y)方法，设置页面在X轴和Y轴上面的滚动值
* 再获取图片底部到页面文档顶端的距离，采用const imageBottom = sliderimage.offsetTop + sliderimage.height;
- sliderimage.offsetTop表示该图片最上面的值，到页面文档顶端的距离，再加上该图片的高度，就是图片底部到页面文档顶端的距离
* 设置两个flag，分别表示图片是否显示了一半和图片是否已经被完全滚动出去了，分别为const isHalfShown = slideAt > sliderimage.offsetTop;，const isNotScrolledPast = window.scrollY < imageBottom;
* 只有当图片已经显示了一半并且没有被图片没有被滚动出窗口是，图片才会显示出来，此处的动画处理方式如下：默认时将图片向左或向右移动30%，当图片出现在窗口中时，取消该图片的移动，显示在原位置；再加上transition: all .5s;，在图片出现的时候，就会显示出约0.5秒的过渡动画。