<?php 
	include("./config.php");

	$name = $_POST["name"];
	$psw = $_POST["psw"];

	$sql = "insert into user (name,psw) values ('$name','$psw')";
	$res = mysql_query($sql);
	if($res){
		echo json_encode(array(
			"res_cod"=>1,
			"res_message"=>"注册成功"
		));
	}else{
		echo json_encode(array(
			"res_cod"=>0,
			"res_message"=>"注册失败"
		));
	}
 ?>