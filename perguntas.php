<?php
include 'conexao.php';

header('Content-Type: application/json');

$sql = "SELECT * FROM perguntas";
$res = $conn->query($sql);

$todas = array();

if ($res && $res->num_rows > 0) {
    
    while($linha = $res->fetch_assoc()) {
        
        $cat = $linha['categoria'];       
        $dif = $linha['dificuldade'];     
        
        $opcoes = json_decode($linha['opcoes']);

        $p = array(
            "question" => $linha['pergunta'],
            "options" => $opcoes,
            "correct" => intval($linha['correta']) 
        );

        $todas[$cat][$dif][] = $p;
    }
}

echo json_encode($todas);
?>