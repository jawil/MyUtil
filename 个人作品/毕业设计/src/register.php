<?php
require_once('connect.php');
header('Content-Type:text/html;charset=utf-8');
        $username = $_POST['username'];
        $password =trim($_POST['passwd']);
        $email =trim($_POST['email']);
        if ($username == '' || $password== '' || $email == '') {
            $res = urlencode("参数有误");
            exit(json_encode(2)); //有空信息
        }

        $sql = "select username from `user_info` where username='$username'";
        $query = mysql_query($sql);
        $count = mysql_num_rows($query);

        if ($query && $count > 0) {
            exit(json_encode(1)); //返回1表示注册失败,已经注册
        } else {

            $addsql = "insert into `user_info` (username,password,email) values ('$username','$password','$email')";
            mysql_query($addsql);
            exit(json_encode(0)); //返回0表示注册成功
        }


?>
