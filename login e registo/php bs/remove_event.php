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

// PHP code 
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["variableName"])) {
    $receivedVariable = $_POST["variableName"];
    $my_array = explode(',', $receivedVariable);
    // Process the received variable here
    $query = 'DELETE FROM events_ WHERE user_ = ? AND day_ = ? AND month_ = ? AND year_ = ?';
    $stmt = $con->prepare($query);
    $stmt->bind_param('siii', $_SESSION['user'], $my_array[0], $my_array[1], $my_array[2]);
    $stmt->execute();
    $stmt->close();

    echo $receivedVariable;
} else {
    echo "No data received";
}

$con->close();
?>