<?PHP
	require_once('connect.php');
	$id = $_GET['id'];
	$sql = "select * from music_list where id = $id";
	
	$query = mysql_query($sql);
	
	if( $query && mysql_num_rows($query) ){
		echo json_encode(mysql_fetch_assoc($query));
	}

?>