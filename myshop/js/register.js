class Register{
	constructor(){
		
		this.btn = document.querySelector("#btnRigester");
		this.bindEvent();
	}
	bindEvent(){


		
		this.btn.onclick = ()=>{
			this.name = document.querySelector('#inputName').value;
			this.psw = document.querySelector('#inputPsw').value;
			let name = this.name;
			let psw = this.psw;

			if(this.name === "" || this.psw ===""){
				alert("不能为空！");
			}else{
				tools.ajax("POST","../api/register.php",{name,psw},data=>{
					if(data.res_cod === 1){
						alert(data.res_message);
						if(confirm("前往登录？")){
							window.location.href = "../htmls/login.html";
						}
					}
				});
			}
		}
	}
}
new Register();