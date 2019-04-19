class Show{
	constructor(selector){
		this.container = document.querySelector(selector);
		this.clickBtn = document.querySelector('.clickBtn');
		this.closeBtn = this.container.querySelector('.closeBtn');
		this.input = null;
		this.textarea = null;
		this.weibo = new Weibo('.box');

		this.model = null;
		this.tool = tools;
		this.bindEvents();
	}
	bindEvents(){

		//点击发布微博显示弹框
		this.clickBtn.onclick = ()=>{
			this.container.innerHTML = `
				<h4>发布微博</h4>
				<a href="javascript:;" class = 'closeBtn'>x</a>
				<p><label>用户名：<input type="text" id='username'></label></p>
				<p><label>微博内容：<textarea></textarea></label></p>
				<p><button class="faweibo">发布</button></p>
			`;

			this.tool.showCenter(this.container);

			this.input = this.container.querySelector('input');
			this.textarea = this.container.querySelector('textarea');

			this.model = document.createElement('div');
			this.model.className = 'model';

			document.body.appendChild(this.model);
		}
		//事件委托，点击删除，点击发布
		this.container.onclick= e=>{
			switch(e.target.className){
				case 'faweibo':
					this.faweiboClick();
					console.log(11);
				case 'closeBtn':  ;

				document.body.removeChild(this.model);
				this.container.style.display = 'none';
			}
		}

		
	}

	faweiboClick(){
		
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var h = date.getHours();
		var m = date.getMinutes();  
		var s = date.getSeconds();
		var da = date.getTime();
		var news = {
			name:this.input.value,
			text:this.textarea.value,
			time:`${year}/${month}/${day} ${h}:${m}`,
			d:da
		}

		this.weibo.json.push(news);

		this.weibo.render();
	}



}
var show = new Show('.container');
