class Weibo{
	constructor(selector){
		this.box = document.querySelector(selector);
		this.ulBox = this.box.querySelector('ul');

		this.json = [
		{name:'张三',text:'今天考试好开心好开心',time:'2019/3/4 10:12',d : '1555667650137'},
		{name:'张三',text:'今天考试好开心好开心',time:'2019/12/19 15:12', d : '1555667650137'}

		];
		this.render();
		this.bindEvents();

	}
	render(){
		let _html = '';
		this.json.forEach(item =>{
			_html += `
			<li class="weibo" index = ${item.d}>
			<h3 class="userName">${item.name}<span>${item.time}</span></h3>
			<div>${item.text}</div>
			<div class="youBtn">
				<a href="javascript:;"  class="reBtn">撤回</a>
				<a href="javascript:;" class="delBtn">删除</a>
			</div>
			</li>
			`;
		});
		this.ulBox.innerHTML = _html;
	}
	//
	bindEvents(){
		//事件委托，点击右键
		document.oncontextmenu = e=>{
			//阻止右键的默认行为
			if(e.preventDefault){
					// IE
				e.preventDefault();
			}else{
				// 非IE
				window.event.returnValue = false;
			}

			//在用户名区点击微博右键,显示删除撤回按钮
			let tr = e.target.parentNode;

			if(e.target.className == 'userName'){
				var x = e.clientX;
				var y = e.clientY;
				this.showYouBtn(tr,x,y);
			}
				
		}
		this.box.onclick = e=>{

			let h3 = e.target.parentNode;
			let li = e.target.parentNode.parentNode;
			switch(e.target.className){
				/*case 'userName':
				this.hideYouBtn(h3);
				break;*/

				case 'reBtn':
				this.reBtnClick(li);
				this.hideYouBtn(li);
				break;

				case 'delBtn':
				this.delBtnClick(li);
				this.hideYouBtn(li);
				break;
			}
		}

	}
	hideYouBtn(li){
		document.querySelector('.youBtn').style.display = 'none';
	}

	showYouBtn(tr,x,y){
		tr.querySelector('.youBtn').style.display = 'block';
		tr.querySelector('.youBtn').style['left'] = x + 'px';
		tr.querySelector('.youBtn').style['top'] = y + 'px';

	}
	delBtnClick(li){
		if(confirm('确定删除该微博？')){
			li.remove();
		}
		this.hideYouBtn();
		
	}
	reBtnClick(li){
		if(confirm('确定撤回该微博吗？')){
			let date = new Date();
			let now = date.getTime();
			if(now - li.getAttribute('index') <=120000){
				li.remove();
			}else{
				alert('已经超过两分钟，你不能删除该微博！');
			}
		}
		this.hideYouBtn();

	}

}

//var weibo = new Weibo('.box');