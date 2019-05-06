class Login{
	constructor(){
		this.inputName = document.querySelector('#inputName');
		this.inputPsw = document.querySelector('#inputPsw');
		this.loginBtn = document.querySelector('.login-btn');
		this.checkB = document.querySelector('#checkB');

		this.bindEvent();
	}
	bindEvent(){
		this.loginBtn.onclick = ()=>{
			let name = this.inputName.value;
			let psw = this.inputPsw.value;
			if(name === "" || psw === ""){
				alert("输入不能为空！");
				return;
			}else{
				tools.ajax("post","../api/login.php",{name,psw},data =>{
					if(data.res_cod === 1){
						if(this.checkB.checked){
							tools.cookie("userName",name,{expires:7,path:'/'});
						}else{
							tools.cookie("userName",name,{path:'/'});
						}
						alert(data.res_massage);
						window.location.href = "../index.html";
					}else{
						alert(data.res_massage);
					}
					
				});
			}
			return false;
		}
	}
}
new Login();