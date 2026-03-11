<?php

require './conexion.php';
$adrema = $_GET['adrema'];

$sql = $conexion->query("SELECT adrema, true as located FROM app.adremas_sin_datos_incripcion WHERE adrema = '$adrema'");
if($sql->rowCount() > 0){
    $data = $sql->fetch(PDO::FETCH_ASSOC);
    echo json_encode($data);
}else{
    $data = [
        'searched' => $adrema,
        'located' => false,
    ];

    echo json_encode($data);
}

$conexion = null;

?>