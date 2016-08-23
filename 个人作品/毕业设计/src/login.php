
<?php
require_once('connect.php');
header('Content-Type:text/html;charset=utf-8');
        $username = $_POST['mobile'];
        $password =trim($_POST['passwd']);
        $sqluser = "select id,username,password from `user_info` where username='" . $username . "'  ";
        $queryuser = mysql_query($sqluser);
        $rowuser = mysql_fetch_array($queryuser);
        if ($rowuser && is_array($rowuser) && !empty($rowuser)) {
            if ($rowuser['username'] == $username && $rowuser['password'] == $password) {
               if ($rowuser['password'] == $password) {
                    $res = "登录成功";
                  $query = mysql_query($sqluser );
                if( $query && mysql_num_rows($query) ){
                exit (json_encode(mysql_fetch_assoc($query)));
                }
                }
            } else {
                $res = "密码错误";
                 exit(json_encode($res));
            }
        } else {
            $res = "用户名不存在";
             exit(json_encode($res));
        }
/*require_once('connect.php');
header('Content-Type:text/html;charset=utf-8');
        $username = $_POST['mobile'];
        $password =trim($_POST['passwd']);
        $sqluser = "select id,username,password from `user_info` where username='" . $username . "' and password='" . $password . "'";
        $queryuser = mysql_query($sqluser);
        $rowuser = mysql_fetch_array($queryuser);
        if ($rowuser && is_array($rowuser) && !empty($rowuser)) {
            if ($rowuser['username'] == $username && $rowuser['password'] == $password) {
               if ($rowuser['password'] == $password) {
                    $res = "登录成功";
                  $query = mysql_query($sqluser );
                if( $query && mysql_num_rows($query) ){
                exit (json_encode(mysql_fetch_assoc($query)));
                }
                } else {
                    $res = "密码错误";
                     exit(json_encode(2));
                }
            } else {
                $res = "用户名不存在";
                 exit(json_encode(3));
            }
        } else {
            $res = "用户名密码错误";
             exit(json_encode(4));
        }*/


?>
