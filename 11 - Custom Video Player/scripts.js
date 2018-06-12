//获取所有页面元素
let video = document.querySelector('.viewer');
let progress = document.querySelector('.progress');
let toggle = document.querySelector('.toggle');
let player__slider = document.querySelectorAll('.player__slider');
let skip = document.querySelectorAll('[data-skip]');
let filled = document.querySelector('.progress__filled');
let progressBar = document.querySelector('.progress');

function videoplay(e){
    const method = video.paused? 'play' : 'pause';
    video[method]();
}

function handleToggle(){
    let icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handlePlayerSlider(e){
    video[e.target.name] = e.target.value;
}

function handleSkip(e){
    let skiptime = parseFloat(this.dataset.skip);
    video.currentTime += skiptime;
}

function filledUpdate(){
    let portion = parseFloat(video.currentTime / video.duration) * 100;
    filled.style.flexBasis = `${portion}%`;
}

function handlefilled(e){
    let pice = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = pice;
}

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
