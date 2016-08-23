<?PHP

	header("Content-type: text/html; charset=utf-8");
	$con = mysql_connect('localhost','root','123456');
	mysql_select_db('mysql');
	mysql_query('set names utf8');

?>