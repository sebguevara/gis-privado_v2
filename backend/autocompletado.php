<?php
require('../conPDO1921681051.php');
$busqueda = $_GET['nombre_calle'];
switch ($_GET['queBusca']) {
    case 'Calle':
        $busqueda = strtoupper(trim($_GET['nombre_calle']));
        $sql = "SELECT distinct nombre_calles AS name FROM gismcc.calles  WHERE nombre_calles LIKE '%$busqueda%' LIMIT 50";
        $sql = $conPdoPg->query($sql);
        $res = [];
        while ($row = $sql->fetchObject()) {
            $res[] = $row;
        }

        echo json_encode($res);
        break;
    case 'Barrio':
        $busqueda = strtoupper(trim($_GET['nombre_calle']));
        $sql = "SELECT 
                        nombre_barrio AS name, 
                        st_asgeojson(ST_Transform(ST_SetSrid(the_geom_barrios, 22185), 4326))::json as \"geometry\"
                FROM gismcc.vw_barrios_de_la_ciudad
                WHERE translate(nombre_barrio, 'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ', 'aeiouAEIOUaeiouAEIOU') LIKE '%$busqueda%'";
        $sql = $conPdoPg->query($sql);
        $res = [];
        while ($row = $sql->fetchObject()) {
            $res[] = $row;
        }

        echo json_encode($res);
        break;
    default:
        # code...
        break;
}
 
$conPdoPg = null;