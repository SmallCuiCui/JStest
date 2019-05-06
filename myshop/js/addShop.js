class AddShop {
	constructor(){
		this.name = document.querySelector('#inputName');
		this.price = document.querySelector('#inputPrice');
		this.num = document.querySelector('#inputNum');
		this.btn = document.querySelector('#addBtn');

		this.bindEvent();
	}
	bindEvent(){
		this.btn.onclick = e =>{
			let name = this.name.value,
				price = this.price.value,
				num = this.num.value;
			if(name==="" || price==="" || num===""){
				alert("输入不能为空")
				return;
			}

			tools.ajaxGetPromise("api/add.php",{name,price,num}).then(data =>{

				if(data.res_cod === 1){
					alert(data.res_message);
					this.name.value = this.price.value = this.num.value = "";

					//隐藏模态框
					$('#myModal').modal('hide');

					//从新渲染表格
					getShop.init();
				}
			});
		}
	}

}

new AddShop();