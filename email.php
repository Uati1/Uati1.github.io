<?php
if($_POST){
    $subject = $_POST['subject'];
    $email = $_POST['email'];
    $message = $_POST['message'];

//send email
    mail("slatacz1@gmail.com", "This is an email from:" .$email, $message);
}
?>