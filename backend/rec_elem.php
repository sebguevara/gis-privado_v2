<?php
session_name('privado_v2');
session_start();

/**
 * Este script se utiliza para hacer la busqueda de objetos geometricos.
 * Funcionamiento:
 *   en la variable post 'a' recibe una marca para saber donde buscar.
 *   esa marca puede ser: 'calle', 'barrio', 'partida inmo', 'dependencia municipal', etc, etc.
 *   con esa marca se en que tabla de la base de datos tiene que buscar.
 *
 *   La variable nombre_calle2 solo se utiliza cuando se busca una interseccion
 * Desarrollo: Lic. Carlos Garcia - carlosgctes[@]gmail[.]com"
 * Fecha Modif.: 09/02/2020
 */
require_once('middleware.php');
isLogged();

require_once('../conPDO1921681051.php');
require_once('consulta_x_altura.php');
require_once('eliminarAcentos.php');
require_once('functions.php');



$ret = '';

$que_busca = is_null($_GET['queBusca']) ? '' : $_GET['queBusca'];

$nombre_calle = mb_strtoupper($_GET['nombre_calle'], 'utf-8');
$nombre_calle = eliminarAcentos($nombre_calle);
if(isset($_GET['nombre_calle2']) && !is_null($_GET['nombre_calle2'])){
    $nombre_calle2 = trim(mb_strtoupper($_GET['nombre_calle2'], 'utf-8'));
    $nombre_calle2 = eliminarAcentos($nombre_calle2);
}

if($nombre_calle == ""){
    echo -1; // no hay resultados
    exit;
}



// selecciona que buscar
switch($que_busca){

    case 'Calle':

        // st_transform(st_setsrid(t1.the_geom, 4326), 22185) AS the_geom,
        $qry_calle = "SELECT
		  			(nombre_calles || ' ' || altura) AS name,
					st_asgeojson(ST_Transform(ST_SetSrid(the_geom_calles, 22185), 4326))::json as \"geometry\"
        		    FROM gismcc.calles
        	 	    WHERE translate(nombre_calles, 'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ', 'aeiouAEIOUaeiouAEIOU') LIKE '%$nombre_calle%'";

        $rst_calle = $conPdoPg->query($qry_calle);

        $ret = '';
        $c = 0; // contador de ciclos

        if($rst_calle->rowCount() != 0){
            while( $reg_calle = $rst_calle->fetchObject()){

                if($c > 0)  $ret .= ',';

		    $reg_calle->geometry = substr($reg_calle->geometry, 0, (strlen($reg_calle->geometry) - 1)) . ', "name": '.'"'.$reg_calle->name . '"}';
                $ret .=  $reg_calle->geometry;

                $c++;

            }

        }else{
            //Si el nombre de la calle no existe buscar calle y altura
            $res = calleYaltura($nombre_calle, $conPdoPg);
            if($res != false){
                echo json_encode($res);
                exit;
            }else{
                echo '-1';
                exit;
            }
        }

    break;

    case 'Barrio':

        $qry = "SELECT nombre_barrio AS name, st_asgeojson(ST_Transform(ST_SetSrid(the_geom_barrios, 22185), 4326))::json as \"geometry\"
        FROM gismcc.vw_barrios_de_la_ciudad
        WHERE translate(nombre_barrio, 'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ', 'aeiouAEIOUaeiouAEIOU') LIKE '%$nombre_calle%'";

        $rst = $conPdoPg->query($qry);

        $ret = '';
        $c = 0; // contador de ciclos

        if($rst->rowCount() == 0){
            echo -1; // no hay resultados
            exit;
        }

        while( $reg = $rst->fetchObject()){
            if($c > 0) {

                $ret .= ',';

            }

		$reg->geometry = substr($reg->geometry, 0, (strlen($reg->geometry) - 1)) . ', "name": '.'"'.$reg->name . '"}';
            $ret .=  $reg->geometry;

            $c++;
        }

    break;

    case 'partida inmo':

        $qry = "SELECT st_asgeojson(ST_Transform(ST_SetSrid(the_geom, 22185), 4326))::json as geometry from ((
            SELECT
                t2.adrema,
                t1.the_geom
            FROM
                gismcc.parcelas t1,
                gismcc.ph_parcelas t2
            WHERE
                ST_Intersects (t2.the_geom, t1.the_geom) )
            UNION(
            SELECT
                t2.adrema,
                t2.the_geom
            FROM
            
                gismcc.parcelas t2))as t3 
            where t3.adrema like '%$nombre_calle%'";

        $rst = $conPdoPg->query($qry);

        $ret = '';
        $c = 0; // contador de ciclos

        if($rst->rowCount() == 0){
            echo -1; // no hay resultados
            exit;
        }

        while( $reg = $rst->fetchObject()){
            if($c > 0) {

                $ret .= ',';

            }

            $ret .=  $reg->geometry;

            $c++;
        }

    break;

    case 'dependencia municipal':

        $qry = "SELECT descripcion as name, st_asgeojson(ST_Transform(ST_SetSrid(the_geom, 22185), 4326))::json as \"geometry\"
        FROM gismcc.vw_dependencias_municipales
        WHERE upper(descripcion) LIKE '%$nombre_calle%'";

        $rst = $conPdoPg->query($qry);

        $ret = '';
        $c = 0; // contador de ciclos

        if($rst->rowCount() == 0){
            echo -1; // no hay resultados
            exit;
        }

        while( $reg = $rst->fetchObject()){
            if($c > 0) {

                $ret .= ',';

            }

            $ret .=  $reg->geometry = substr($reg->geometry, 0, (strlen($reg->geometry) - 1)) . ', "name": '.'"'.$reg->name . '"}';
            $c++;
        }

    break;

    case 'plaza':
        $qry = "SELECT st_asgeojson(ST_Transform(ST_SetSrid(the_geom, 22185), 4326))::json as \"geometry\"
        FROM gismcc.vw_espacio_verde
        WHERE translate(nombre_plaza, 'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ', 'aeiouAEIOUaeiouAEIOU') LIKE '%$nombre_calle%'";
        $rst = $conPdoPg->query($qry);

        $ret = '';
        $c = 0; // contador de ciclos

        if($rst->rowCount() == 0){
            echo -1; // no hay resultados
            exit;
        }

        while( $reg = $rst->fetchObject()){
            if($c > 0) {

                $ret .= ',';

            }

            $ret .=  $reg->geometry;
            $c++;
        }

    break;

    case 'interseccion':


        $intersection = "SELECT st_asgeojson(ST_Transform(ST_SetSrid(ST_Intersection(the_geom_calles, the_geom_calles2), 22185), 4326))::json AS \"geometry\"
                            FROM (SELECT the_geom_calles FROM gismcc.calles WHERE nombre_calles LIKE '%$nombre_calle%') AS c1
                            INNER JOIN (
                                            SELECT the_geom_calles AS the_geom_calles2
                                            FROM gismcc.calles
                                            WHERE translate(nombre_calles, 'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ', 'aeiouAEIOUaeiouAEIOU') LIKE '%$nombre_calle2%'
                                        ) AS c2
                            ON ST_Intersects(c1.the_geom_calles, c2.the_geom_calles2)";


        $rst = $conPdoPg->query($intersection);

        $ret = '';
        $c = 0; // contador de ciclos

        if($rst->rowCount() == 0){
            echo -1; // no hay resultados
            exit;
        }

        while( $reg = $rst->fetchObject()){
            if($c > 0) {
                $ret .= ',';               
            }

            $reg->geometry = str_ireplace("}", ', "name":'.'"'.$nombre_calle. ' Y ' .$nombre_calle2.'"}', $reg->geometry);
           
            $ret .=  $reg->geometry;

            
            $c++;
        }

        
    break;

    case 'razsoc':
        $response = buscarCuitOrazsoc($conPdoPg, $_GET['nombre_calle'], 'razsoc');
        echo $response;
        exit();
        break;
    case 'cuit':
        $response = buscarCuitOrazsoc($conPdoPg, $_GET['nombre_calle'], 'cuit');
        echo $response;
        exit();
        break;
    case 'mensura':
        echo buscarCuitOrazsoc($conPdoPg, $_GET['nombre_calle'], 'mensura');
        exit;
        break;
}


$conPdoPg = null;
echo '[' . $ret . ']'; // devuelve un string geojson

exit();

?>
