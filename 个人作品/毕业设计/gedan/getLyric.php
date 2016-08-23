<?PHP
header("Content-type: text/html; charset=utf-8");

		$lyric = $_GET['lyric'];
		$con=file_get_contents($lyric  );
		echo $con;




?>