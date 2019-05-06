<?php 
	include("./config.php");

	$id = $_GET["id"];
	$price = $_GET["price"];
	$num = $_GET["num"];

	$sql = "update shop set price=$price,num=$num where id=$id";
	$res = mysql_query($sql);
	if($res){
		echo json_encode(array(
			"res_cod"=>1,
			"res_message"=>"修改成功"
		));
	}else{
		echo json_encode(array(
			"res_cod"=>0,
			"res_message"=>"修改失败"
		));
	}
 ?>