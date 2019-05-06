<?php 
	include("./config.php");

	$name = $_POST["name"];
	$psw = $_POST["psw"];

	$sql = "select * from user where name = '$name' and psw = '$psw'";

	$res = mysql_query($sql);
	if(mysql_num_rows($res)>0){
		echo json_encode(array(
			"res_cod"=>1,
			"res_massage"=>"登录成功"
		));
	}else{
		echo json_encode(array(
			"res_cod"=>0,
			"res_massage"=>"登录失败"
		));
	}
 ?>