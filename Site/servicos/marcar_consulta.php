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

$email = $_SESSION['user'];
$used_time = "";

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["variableName"])) {
    $receivedVariable = $_POST["variableName"];
    $my_array = explode(',', $receivedVariable);
    // Process the received variable here
    $query = 'SELECT time_ FROM events_ WHERE day_ ='.$my_array[0].' AND month_ ='.$my_array[1].' AND year_ ='.$my_array[2];
    $stmt = $con->query($query);

    while($row = $stmt->fetch_assoc()){
        $used_time = $used_time.' '.$row['time_'].' '.$my_array[0].' '.$my_array[1].' '.$my_array[2];
    }

    $stmt->close();

    echo $used_time;
} else {
    echo "No data received";
}
?>