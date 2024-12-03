<?php
    function add_data($conn){
        $email = $_POST["email_insert"];
        $password = $_POST["new_password"];
        $f_name = $_POST["first_name"];
        $l_name = $_POST["last_name"];
        $address = $_POST["address"];
        $phone = $_POST["phone"];

        $sql = "INSERT INTO log_info SET email = ?, password_ = ?, first_name = ?, last_name = ?, address_ = ?, phone = ?";
        $stmt = $conn->prepare($sql);
        if(!$stmt){
            die("prepare failed".$conn->error);
        }
        $stmt->bind_param("sssssi",$email,$password,$f_name,$l_name,$address,$phone);
        if($stmt->execute()){
            header("Location: website-casadocao.html");
        }else{
            echo "error".$conn->error;
        }

        $stmt->close();
    }

    function is_email_unique($con){
        $email = $_POST["email_insert"];

        $sql = "SELECT email FROM log_info";
        $stmt = $con->query($sql);

        while($row = $stmt->fetch_assoc()){
            if($row['email'] == $email){
                return false;
            }
        }
        return true;
    }
    
    $host="localhost";
    $port=3306;
    $socket="MySQL";
    $user="root";
    $password="1234";
    $dbname="new_schema";
    
    $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
        or die ('Could not connect to the database server' . mysqli_connect_error());
    

    if(is_email_unique($con)){
        add_data($con);
    }   
    $con->close();    
?>