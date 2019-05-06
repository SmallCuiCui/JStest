

let outLogin = document.querySelector('#outLogin');
let loginUl = document.querySelector('#login-ul');
let wellcome = document.querySelector('#wellcome');
isLogin();

function isLogin(){
	let islogin = tools.cookie("userName");
	if(islogin ){
		loginUl.classList.add('hidden');
		wellcome.classList.remove('hidden');
		document.querySelector('#name-container').innerHTML = islogin;
	}else{
		loginUl.classList.remove('hidden');
		wellcome.classList.add('hidden');
	}
}

outLogin.onclick = function(){
	if(confirm("确认退出吗？")){
		tools.cookie("userName","",{path:'/'});
		console.log(tools.cookie("userName"));
		isLogin();
	}
}