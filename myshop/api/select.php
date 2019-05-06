<?php 
	
	include("./config.php");
	$pageIndex = $_GET["pageIndex"];
	$count = $_GET["count"];

	//先取得总条数，进行分页
	$sqlAll = "select * from shop";
	$resAll = mysql_query($sqlAll);
	$countAll = mysql_num_rows($resAll);//总的数据条数
	$pageCount = ceil($countAll / $count);//分页页数

	$start = ($pageIndex - 1) * $count;
	$sql = "select * from shop limit $start,$count";
	$res = mysql_query($sql);

	$shop = array();
	while ($row = mysql_fetch_assoc($res)) {
		array_push($shop, $row);
	}

	$json = array(
		"res_code"=>1,
		"res_message"=>"查询成功",
		"res_body"=>array(
			"data"=>$shop,
			"pageCount"=>$pageCount
		)
	);
	echo json_encode($json);
	//关闭数据库的连接
	mysql_close();
 ?>