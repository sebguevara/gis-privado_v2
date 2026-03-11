<?php
require_once('./conexion.php');
$gid = $_GET['gid'];

$sql = "SELECT 
            t1.the_geom, 
            t1.gid,
            t2.*,
            t3.distritos,
            t3.en_catalogo,
            CASE
                WHEN ( SELECT COUNT(t4.adrema) FROM app.adremas_sin_datos_incripcion t4 WHERE t4.adrema = t2.adrema ) > 0 THEN true 
                ELSE false
            END AS sin_datos_insc
        FROM gismcc.parcelas t1
        LEFT JOIN gismcc.ph_parcelas t2 ON ST_Intersects(t2.the_geom,t1.the_geom)
        LEFT JOIN app.vw_calculo_factibilidad t3 ON t1.gid = t3.gid
        WHERE t1.gid = $gid
        ORDER BY t2.piso, t2.dpto"; 

$sql = $conexion->prepare($sql);
$sql->execute();

$data = $sql->fetchAll(PDO::FETCH_ASSOC);

$adremas = [];
foreach ($data as $parcela) {
    array_push($adremas, $parcela['adrema']);
}

$sql->closeCursor();
$conexion = null;

header('Content-Type: application/json; charset=utf-8');
echo json_encode($data);

