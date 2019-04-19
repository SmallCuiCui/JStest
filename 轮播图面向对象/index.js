class Lunbo{
	constructor(selector){
		this.container = document.querySelector(selector);
		this.imgs = Array.from(this.container.querySelector('ul').querySelectorAll('li'));
		this.links = Array.from(this.container.querySelector('ol').querySelectorAll('li'));
		
		this.goPre = this.container.querySelector('.goPre');
		this.goNext = this.container.querySelector('.goNext');

		this.index = 0;//标记当前播放0-3
		this.preIndex = 0;//标记上一张播放
		this.timer = null;
		this.direction = 'left';//图片切换方向

		this.bindEvents();
		this.autoPlay();

	}
	bindEvents(){

		this.links.forEach(item =>{

			item.onclick = this.linksClick.bind(this,item);
		});

		this.goPre.onclick = this.goPreClick.bind(this);
		this.goNext.onclick = this.goNextClick.bind(this);

		this.container.onmouseenter = this.puse.bind(this);
		this.container.onmouseleave = this.autoPlay.bind(this);
	}

	linksClick(item){
		console.log(item.innerHTML);
		this.index = item.innerHTML - 1;
		this.changeImg();
	}
	goPreClick(){
		this.direction = 'left';
		this.index = --this.index >= 0 ? this.index : this.imgs.length-1;

		this.changeImg();
	}
	goNextClick(){
		this.direction = 'right';
		this.index = ++this.index < this.imgs.length ? this.index : 0;

		this.changeImg();
	}
	//自动轮播
	autoPlay(){

		clearInterval(this.timer);
		this.timer = setInterval(()=>{
			this.goNextClick();
		},3000);

	}
	changeImg(){
		
		this.imgs.forEach((item,index) =>{
			item.style.transition = 'none';
		})

		this.imgs[this.preIndex].transition = 'all 1s';
		this.imgs[this.index].transition = 'all 1s';

		this.links[this.preIndex].className = '';
		this.links[this.index].className = 'ac';

		this.imgs.forEach((item,index) =>{

			if(this.direction == 'left'){//向左切换图片
				item.style.left = this.setLeft(item,-600);
			}else{//向右切换图片
				item.style.left = this.setLeft(item,600);
			}

		})
		this.preIndex = this.index;
	}
	puse(){
		clearInterval(this.timer);
	}
	setLeft(item,dis){
		var left = parseInt(this.getStyle(item,'left'));
		
		left += dis;
		if(left > 0){
			left = left === 1800?-600:left;
		}else{
			left = left === -1200?1200:left;
		}
		
		return left + 'px';
	}
	getStyle (obj, attr) {
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
	}
}
var lunbo = new Lunbo('.box');