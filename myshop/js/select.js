class SelectList{
	constructor(selector){
		this.tbody = document.querySelector(selector);
		this.pageIndex = 1;//记录当前页，默认处于第一页
		this.pageCount = 1;//记录一共有多少页
		//count指一页展示的商品数量，不能被修改
		Object.defineProperty(this,"count",{
			writable:false,
			value:4
		});
		this.init();

	}
	//查询数据库获得数据
	init(){
		if(this.pageIndex > this.pageCount)this.pageIndex = this.pageCount;	
		let {pageIndex,count} = this;
		tools.ajaxGetPromise("api/select.php",{pageIndex,count}).then(data =>{
			if(data.res_code === 1){
				this.render(data.res_body.data);
				this.pageCount = data.res_body.pageCount;
				//将整个查询对象做为变量给分页渲染
				pagination.render(this);
			}else{
				alert("查询失败！");
			}
		})
	}
	render(list){
		let html = "";
		list.forEach((item,index) =>{
			html += `
			<tr data-id = ${item.id}>
			<td>${(this.pageIndex -1) * this.count + index + 1}</td>
			<td>${item.name}</td>
			<td>
			<span>${item.price}</span>
			<input type="text" id = "inputPrice" name="">
			</td>
			<td>
			<span>${item.num}</span>
			<input type="text" id = "inputNum" name="">
			</td>
			<td>
			<a class="btn btn-primary btn-xs btn-edit" href="javascript:;" role="button">编辑</a>
			<a class="btn btn-danger btn-xs btn-del" href="javascript:;" role="button">删除</a>
			<a class="btn btn-success btn-xs btn-ok" href="javascript:;" role="button">确定</a>
			<a class="btn btn-info btn-xs btn-cancel" href="javascript:;" role="button">取消</a>
			</td>
			</tr>
			`
		});
		this.tbody.innerHTML = html;
	}
}
let getShop = new SelectList("#tbody");