class Pagination{
	constructor(){
		this.ul = document.querySelector('#pagination');
		this.next = document.querySelector('#nextPage');
		this.bindEvents();
	}

	//渲染分页导航，由表格渲染获取数据之后调用
	render(selectList){
		//得到查询对象
		this.selectList = selectList;

		Array.from(document.querySelectorAll('.page-li')).forEach(item =>{
			item.remove();
		})
		for(let i = 1; i <= this.selectList.pageCount; i++){
			let li = document.createElement('li');
			li.className = i === this.selectList.pageIndex ? "page-li active" : "page-li";
			li.innerHTML = `<a href="javascript:;" class="pageBtn">${i}</a>`;
			this.ul.insertBefore(li,this.next);

		}
	}
	//分页导航绑定点击事件
	bindEvents(){
		this.ul.onclick = e =>{
			let target = e.target;
			//let targetClass = Array.from(target.classList);
			//解构
			let targetClass = [...target.classList];
			if(targetClass.includes("pageBtn")){
				this.selectList.pageIndex = Number(target.innerHTML);
				this.selectList.init();
				
			}else if(targetClass.includes("prePage")){
				if(--this.selectList.pageIndex< 1){
					this.selectList.pageIndex = 1;
					return;
				}
				this.selectList.init();
				
			}else if(targetClass.includes("nextPage")){
				if(++this.selectList.pageIndex > this.selectList.pageCount){
					this.selectList.pageIndex = this.selectList.pageCount;
					return;
				}
				this.selectList.init();
			}
			
		}
	}
}
let pagination = new Pagination();