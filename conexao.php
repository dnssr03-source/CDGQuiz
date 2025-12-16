<?php
$host = "localhost";
$user = "root";
$pass = "root";
$bd = "quiz_db";

$conn = new mysqli($host, $user, $pass, $bd);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
?>