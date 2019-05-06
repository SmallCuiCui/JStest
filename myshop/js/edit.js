class EditTable{
	constructor(){
		this.body = document.querySelector('#tbody');
		this.tr = null;
		this.dataid = null;
		this.bindEvents();
	}
	bindEvents(){
		this.body.onclick =e =>{
			let target = e.target;
			let classL = Array.from(target.classList);
			this.tr = target.parentNode.parentNode;
			this.dataid = Number(this.tr.getAttribute('data-id'));
			if(classL.includes("btn-edit")){
				this.editClick();
			}else if(classL.includes("btn-del")){
				this.delClick();
			}else if(classL.includes("btn-ok")){
				this.okClick();
			}else if(classL.includes("btn-cancel")){
				this.cancelClick();
			}
		}
	}

	editClick(){
		this.tr.classList.add('edit');
		Array.from(this.tr.querySelectorAll('span')).forEach(item =>{
			item.nextElementSibling.value = item.innerHTML;
		});
	}
	delClick(){
		if(confirm("确定删除该商品吗？")){	
			tools.ajaxGetPromise("api/edit.php",{"id":this.dataid}).then(data =>{
				if(data.res_cod === 1){
					alert("成功");
					console.log(111);
					getShop.init();
				}else{
					console.log(111);
					alert(data.res_message);
				}
			})
		}
	}
	okClick(){
		let inputPrice = this.tr.querySelector('#inputPrice'),
			inputNum = this.tr.querySelector('#inputNum'),
			id = this.dataid,
			price = inputPrice.value,
			num = inputNum.value;

		tools.ajaxGetPromise("api/ok.php",{id,price,num}).then(data =>{
			if(data.res_cod === 1){
				alert(data.res_message);
				inputPrice.previousElementSibling.innerHTML = inputPrice.value;
				inputNum.previousElementSibling.innerHTML = inputNum.value;
			}else{
				alert(data.res_message);
			}
		});

		this.tr.classList.remove('edit');
	}
	cancelClick(){
		this.tr.classList.remove('edit');
	}
}

new EditTable();