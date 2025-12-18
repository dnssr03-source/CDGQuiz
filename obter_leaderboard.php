<?php
include 'conexao.php';

header('Content-Type: application/json');

$sql_top = "SELECT nome_utilizador, pontuacao FROM recordes_rapido ORDER BY pontuacao DESC LIMIT 5";
$res = $conn->query($sql_top);

$lista = array();

if ($res && $res->num_rows > 0) {
    while($linha = $res->fetch_assoc()) {
        $lista[] = $linha;
    }
}

echo json_encode($lista);
?>