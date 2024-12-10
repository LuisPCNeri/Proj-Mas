<?php
session_start();
$email = $_SESSION['user'];

$host="localhost";
$port=3306;
$socket="MySQL";
$user="root";
$password="1234";
$dbname="new_schema";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
    or die ('Could not connect to the database server' . mysqli_connect_error());

$name = $_POST['name_animal'];
$motive = $_POST['flexRadioDefault'];
$date_time = $_POST['time'];

$arr = explode(" ", $date_time);
$arr_2 = explode(",", $arr[1]);
$arr_2[1] = $arr_2[1] + 1;

$query = 'INSERT INTO events_ SET user_ = ?, event_description = ?, day_ = ?, month_ = ?, year_ = ?, time_ = ?';
$stmt = $con->prepare($query);
$stmt -> bind_param('ssiiis', $email, $motive, $arr_2[0], $arr_2[1], $arr_2[2], $arr[0] );
$stmt->execute();
$stmt->close();
?>