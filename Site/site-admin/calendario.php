<?php
session_start();
$host="localhost";
$port=3306;
$socket="MySQL";
$user="root";
$password="1234";
$dbname="new_schema";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
    or die ('Could not connect to the database server' . mysqli_connect_error());

$query = 'SELECT * FROM events_';
$stmt = $con->query($query);

$data = array();

while($row = $stmt->fetch_assoc()){
    if($row['user_'] == $_SESSION['user']){
        array_push($data, $row['event_description'], $row['day_'], $row['month_'], $row['year_'], $row['time_']);
    }
}

echo json_encode($data);

$con->close();
?>