<?php

mysqli_connect('localhost/phpmyadmin','root','thinal2004');

echo"Entered phpmyadmin"

mysqli_select_db('registration');

$usrname = $_POST['usrname'];
$password = $_POST['pass'];
$email = $_POST['email'];
$Fname = $_POST['Fname'];
$Lname = $_POST['Lname'];

$s = "select * from userdetails where username = '$usrname'";

$result = mysqli_query($s);

$num = mysqli_num_rows($result);

if($num == 1){
    echo"Username taken";
}else{
    $reg = "insert into userdetails(username,email,password,firstName,lastName) values ('$usrname','$password','$email','$Fname','$Lname')";
    mysqli_query($reg);
    echo"registration complete";
}
?>