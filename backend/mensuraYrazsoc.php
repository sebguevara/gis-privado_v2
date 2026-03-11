<?php
require_once('../conPDO1921681051.php');
$gid = $_GET['gid'];
$sql = "SELECT 
            clase_obj, 
            razsoc, 
            mensura, 
            barrio, 
            supconstr, 
            supparcela,
            valor_e, 
            valor_t, 
            CASE
                WHEN TRIM(resp) = '' THEN null
                ELSE resp
            END 
        from gismcc.parcelas p 
        where gid = $gid and adrema not like '%PH%'";
$sql = $conPdoPg->query($sql);
if($sql->rowCount() > 0){
    $row = $sql->fetchObject();
    echo json_encode($row);
}else{
    
    echo json_encode([]);
} 

$conPdoPg = null;


