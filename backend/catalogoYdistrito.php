<?php
require_once('../conPDO1921681051.php');
$gid = $_GET['gid'];
$sql = "SELECT  t1.id_distrito, en_catalogo AS encatalogo, distritos, pdf_distrito_part AS archivo FROM app.vw_calculo_factibilidad t1 
        INNER JOIN gismcc.distritos_planeamiento_urbano t2 
        ON t1.id_distrito = t2.id_distrito
        WHERE t1.gid = $gid";

$sql= $conPdoPg->query($sql);

$data = $sql->fetchObject();

echo json_encode($data);