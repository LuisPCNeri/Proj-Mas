<?php
function check_info($con){
    $respective_pass = "";
    $sql = 'SELECT email, password_ FROM log_info';
    $stmt = $con->query($sql);

    $email = $_POST["email_inp"];
    $password = $_POST["pass_inp"];

    while($row = $stmt->fetch_assoc()){
        if($row['email'] == $email){
            $respective_pass = $row['password_'];
        }
    }

    if($respective_pass != $password){
        echo "INCORRECT PASSWORD";
    }else{
        session_start();
        $_SESSION["user"] = $email;
        header('Location: ../website-casadocao.html');
    }
}

$host="localhost";
$port=3306;
$socket="MySQL";
$user="root";
$password="1234";
$dbname="new_schema";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
    or die ('Could not connect to the database server' . mysqli_connect_error());
check_info($con);
$con->close();
?>