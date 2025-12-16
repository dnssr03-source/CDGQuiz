<?php
include 'conexao.php';

header('Content-Type: application/json');

$json = file_get_contents("php://input");
$dados = json_decode($json, true);

if(isset($dados['nome']) && isset($dados['pontos']) && isset($dados['modo'])) {
    
    $nome = $dados['nome'];
    $pts = $dados['pontos'];
    $modo = $dados['modo'];

    if ($modo != 'time') {
        echo json_encode(["mensagem" => "Este modo não conta para o ranking."]);
        exit;
    }

    $sql_check = "SELECT pontuacao FROM recordes_rapido WHERE nome_utilizador = ?";
    $stmt = $conn->prepare($sql_check);
    $stmt->bind_param("s", $nome);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($ptsAntigos);
        $stmt->fetch();
        $stmt->close(); 

        if ($pts > $ptsAntigos) {
            $sql_update = "UPDATE recordes_rapido SET pontuacao = ? WHERE nome_utilizador = ?";
            $stmtUpdate = $conn->prepare($sql_update);
            $stmtUpdate->bind_param("is", $pts, $nome);
            
            if ($stmtUpdate->execute()) {
                echo json_encode(["mensagem" => "Boa! Bateste o teu recorde."]);
            }
        } else {
            echo json_encode(["mensagem" => "Não foi suficiente para o recorde."]);
        }

    } else {
        $stmt->close();
        
        $sql_insert = "INSERT INTO recordes_rapido (nome_utilizador, pontuacao) VALUES (?, ?)";
        $stmtInsert = $conn->prepare($sql_insert);
        $stmtInsert->bind_param("si", $nome, $pts);
        
        if ($stmtInsert->execute()) {
            echo json_encode(["mensagem" => "Primeiro jogo registado!"]);
        }
    }

} else {
    echo json_encode(["mensagem" => "Faltam dados."]);
}

$conn->close();
?>