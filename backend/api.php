<?php
session_name('privado_v2');
session_start();
require_once('middleware.php');
require_once('./conexion.php');
define("APP_ID", 3);

function getObras($conexion)
{
    $obra = $_GET['obra'];
    $totales = [];

    $filter = "";
    $estado = isset($_GET['estado']) &&
        $_GET['estado'] != 'null' &&
        $_GET['estado'] != null &&
        $_GET['estado'] != '';

    $fondo = isset($_GET['fondo']) &&
        $_GET['fondo'] != 'null' &&
        $_GET['fondo'] != null &&
        $_GET['fondo'] != '';

    $anio = isset($_GET['anio']) &&
        is_numeric($_GET['anio']) &&
        $_GET['anio'] != 'null' &&
        $_GET['anio'] != null &&
        $_GET['anio'] != '';

    if ($estado) {
        $estado = $_GET['estado'];
        $filter .= " AND estado ILIKE '%$estado%'";
    }

    if ($fondo) {
        $fondo = $_GET['fondo'];
        $filter .= " AND fondo ILIKE '%$fondo%'";
    }

    if ($anio) {
        $anio = $_GET['anio'];
        $filter .= " AND date_part('year', fecha) = $anio";
    }



    /* $sql_totales = "SELECT estado, count(estado) cantidad 
                        FROM app.vw_todos_obras_simples 
                        WHERE obra ILIKE '%$obra%' GROUP BY estado";
    $sql_totales = $conexion->query($sql_totales);

    $totales['obra']=$obra;
    while($tot = $sql_totales->fetchObject()){
        
        $totales['data'][] = [
            'estado' => $tot->estado,
            'cantidad' => $tot->cantidad
        ];
    } */

    $sql = "SELECT
                cantidad,
                unidad,
                metros,
                obra,
                fondo,
                date_part('year', fecha) anio,
                nombre,
                estado,
                st_asgeojson(ST_Transform(ST_SetSrid(the_geom, 22185), 4326))::json as \"geometry\" 
            FROM app.vw_todos_obras_simples 
            WHERE obra ILIKE '%$obra%' " . $filter;
    $sql = $conexion->query($sql);
    $data = [];

    while ($row = $sql->fetchObject()) {
        $geometry = json_decode($row->geometry, true);
        $data['tipo'] = $geometry['type'];
        $data['data'][] = [
            'properties' => [
                'name' => $row->nombre,
                'cantidad' => $row->cantidad,
                'unidad' => $row->unidad,
                'metros' => $row->metros,
                'obra' => $row->obra,
                'fondo' => $row->fondo,
                'anio' => $row->anio,
                'estado' => $row->estado
            ],
            'type' => $geometry['type'],
            'coordinates' => $geometry['coordinates']
        ];
    }

    //$data['totales'] = $totales;
    $conexion = null;
    return json_encode($data);
};


// ================================================================================================


function totales($conexion)
{

    $data = [];

    $obras_totales = "SELECT 
                        trim(upper(t1.obra)) as obra, 
                        t1.unidad,
                        sum(metros::decimal(9,2)) metros_totales,
                        CASE upper(obra) 
                            WHEN 'CORDON CUNETA' THEN sum(metros::decimal(9,2))
                            WHEN 'CLOACAS SOCIAL ' THEN sum(metros::decimal(9,2))
                            WHEN 'REHABILITACION DE PLUVIALES' THEN sum(metros::decimal(9,2))
                            ELSE count(*)
                        END as total
                    FROM app.vw_todos_obras_simples t1
                    
                    GROUP BY t1.obra, t1.unidad 
                    ORDER BY t1.obra
                    ";
    $obras_totales = $conexion->query($obras_totales);

    while ($row = $obras_totales->fetchObject()) {
        if (strlen($row->total) > 3) {
            $row->total = number_format($row->total, 0, ',', '.');
        }

        if (strlen($row->metros_totales) > 3) {
            $row->metros_totales = number_format($row->metros_totales, 2, ',', '.');
        }
        $data['obras_totales'][] = $row;
    }


    $obras_x_estado = "SELECT 
                            trim(upper(t1.obra)) as obra, 
                            t1.unidad, 
                            coalesce(t1.estado, 'Finalizado') as estado,
                            sum(metros::decimal(9,2)) metros_totales,
                            CASE upper(t1.obra) 
                                WHEN 'CORDON CUNETA' THEN sum(metros::decimal(9,2))
                                WHEN 'CLOACAS SOCIAL ' THEN sum(metros::decimal(9,2))
                                WHEN 'REHABILITACION DE PLUVIALES' THEN sum(metros::decimal(9,2))
                                ELSE count(*)
                            END as total
                        FROM app.vw_todos_obras_simples t1
                        GROUP BY t1.obra, t1.unidad, t1.estado 
                        ORDER BY t1.obra, t1.unidad, t1.estado ";

    $obras_x_estado = $conexion->query($obras_x_estado);

    while ($row = $obras_x_estado->fetchObject()) {
        if (strlen($row->total) > 3) {
            $row->total = number_format($row->total, 0, ',', '.');
        }
        if (strlen($row->metros_totales) > 3) {
            $row->metros_totales = number_format($row->metros_totales, 2, ',', '.');
        }
        switch ($row->obra) {
            case 'BACHEO':
                $data['obras_x_estado']['bacheo'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total,
                    'metros_totales' => $row->metros_totales
                ];
                break;

            case 'CLOACAS SOCIAL':
                $data['obras_x_estado']['cloacas_social'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;

            case 'CLOACAS SOCIAL CONEXIONES DOMICILIARIAS':
                $data['obras_x_estado']['cloacas_social_conexiones_dom'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;

            case 'CORDON CUNETA':
                $data['obras_x_estado']['cordon_cuneta'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;

            case 'ENTUBADO DE ACCESO DOMICILIARIO':
                $data['obras_x_estado']['entubado_acceso_dom'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;

            case 'ENTUBADO DE CRUCE DE CALLE':
                $data['obras_x_estado']['entubado_cruce_calle'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;



            case 'INSTALACION DE LEDS':
                $data['obras_x_estado']['instalacion_leds'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;

            case 'INTERVENCION EN PLAZAS':
                $data['obras_x_estado']['intervencion_plazas'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;

            case 'OBRAS DE ENRIPIADO':
                $data['obras_x_estado']['obras_enripiado'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;


            case 'PAVIMENTO':
                $data['obras_x_estado']['pavimento'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;


            case 'RECAPADO':
                $data['obras_x_estado']['recapado'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;

            case 'REHABILITACION DE PLUVIALES':
                $data['obras_x_estado']['rehabilitacion_pluviales'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;

            case 'REHABILITACION DE SUMIDEROS':
                $data['obras_x_estado']['rehabilitacion_sumideros'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;


            case 'REPARACION DE CORDONES':
                $data['obras_x_estado']['reparacion_cordones'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total
                ];
                break;

            case 'VEREDAS':
                $data['obras_x_estado']['veredas'][] = [
                    'estado' => $row->estado,
                    'unidad' => $row->unidad,
                    'total'  => $row->total,
                    'metros_totales' => $row->metros_totales
                ];
                break;
            default:
                # code...
                break;
        }
    }


    $obras_x_anio = "SELECT
                        trim(upper(t1.obra)) as obra, 
                        coalesce(left(t1.fecha::text,4), 'Sin dato') as anio,
                        t1.unidad,
                        CASE upper(t1.obra) 
                                WHEN 'CORDON CUNETA' THEN sum(metros::decimal(9,2))
                                WHEN 'CLOACAS SOCIAL ' THEN sum(metros::decimal(9,2))
                                WHEN 'REHABILITACION DE PLUVIALES' THEN sum(metros::decimal(9,2))
                                ELSE count(*)
                            END as total
                    FROM app.vw_todos_obras_simples t1
                    GROUP BY 1, 2, 3, obra
                    ORDER BY 1, 2, 3";

    $obras_x_anio = $conexion->query($obras_x_anio);

    while ($row = $obras_x_anio->fetchObject()) {
        if (strlen($row->total) > 3) {
            $row->total = number_format($row->total, 0, ',', '.');
        }
        switch ($row->obra) {
            case 'BACHEO':
                $data['obras_x_anio']['bacheo'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'CLOACAS SOCIAL':
                $data['obras_x_anio']['cloacas_social'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'CLOACAS SOCIAL CONEXIONES DOMICILIARIAS':
                $data['obras_x_anio']['cloacas_social_conexiones_dom'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'CORDON CUNETA':
                $data['obras_x_anio']['cordon_cuneta'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'ENTUBADO DE ACCESO DOMICILIARIO':
                $data['obras_x_anio']['entubado_acceso_dom'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'ENTUBADO DE CRUCE DE CALLE':
                $data['obras_x_anio']['entubado_cruce_calle'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'INSTALACION DE LEDS':
                $data['obras_x_anio']['instalacion_leds'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'INTERVENCION EN PLAZAS':
                $data['obras_x_anio']['intervencion_plazas'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'OBRAS DE ENRIPIADO':
                $data['obras_x_anio']['obras_enripiado'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'RECAPADO':
                $data['obras_x_anio']['recapado'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;


            case 'REHABILITACION DE PLUVIALES':
                $data['obras_x_anio']['rehabilitacion_pluviales'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'REHABILITACION DE SUMIDEROS':
                $data['obras_x_anio']['rehabilitacion_sumideros'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'REPARACION DE CORDONES':
                $data['obras_x_anio']['reparacion_cordones'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'VEREDAS':
                $data['obras_x_anio']['veredas'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'PAVIMENTO':
                $data['obras_x_anio']['pavimento'][] = [
                    'anio'  => $row->anio,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;


            default:
                # code...
                break;
        }
    }

    $obras_x_fondo = "SELECT 
                            trim(upper(t1.obra)) as obra, 
                            t1.unidad, 
                            coalesce(t1.fondo, 'Sin dato') as fondo, 
                            CASE upper(t1.obra) 
                                WHEN 'CORDON CUNETA' THEN sum(metros::decimal(9,2))
                                WHEN 'CLOACAS SOCIAL ' THEN sum(metros::decimal(9,2))
                                WHEN 'REHABILITACION DE PLUVIALES' THEN sum(metros::decimal(9,2))
                                ELSE count(*)
                            END as total
                        FROM app.vw_todos_obras_simples t1
                        GROUP BY t1.obra, t1.unidad, t1.fondo 
                        ORDER BY t1.obra, t1.unidad, t1.fondo";

    $obras_x_fondo = $conexion->query($obras_x_fondo);

    while ($row = $obras_x_fondo->fetchObject()) {
        if (strlen($row->total) > 3) {
            $row->total = number_format($row->total, 0, ',', '.');
        }
        switch ($row->obra) {
            case 'BACHEO':
                $data['obras_x_fondo']['bacheo'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'CLOACAS SOCIAL':
                $data['obras_x_fondo']['cloacas_social'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'CLOACAS SOCIAL CONEXIONES DOMICILIARIAS':
                $data['obras_x_fondo']['cloacas_social_conexiones_dom'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'CORDON CUNETA':
                $data['obras_x_fondo']['cordon_cuneta'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'ENTUBADO DE ACCESO DOMICILIARIO':
                $data['obras_x_fondo']['entubado_acceso_dom'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'ENTUBADO DE CRUCE DE CALLE':
                $data['obras_x_fondo']['entubado_cruce_calle'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'INSTALACION DE LEDS':
                $data['obras_x_fondo']['instalacion_leds'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'INTERVENCION EN PLAZAS':
                $data['obras_x_fondo']['intervencion_plazas'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'OBRAS DE ENRIPIADO':
                $data['obras_x_fondo']['obras_enripiado'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;


            case 'PAVIMENTO':
                $data['obras_x_fondo']['pavimento'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'RECAPADO':
                $data['obras_x_fondo']['recapado'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;


            case 'REHABILITACION DE PLUVIALES':
                $data['obras_x_fondo']['rehabilitacion_pluviales'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'REHABILITACION DE SUMIDEROS':
                $data['obras_x_fondo']['rehabilitacion_sumideros'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'REPARACION DE CORDONES':
                $data['obras_x_fondo']['reparacion_cordones'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;

            case 'VEREDAS':
                $data['obras_x_fondo']['veredas'][] = [
                    'fondo' => $row->fondo,
                    'total' => $row->total,
                    'unidad' => $row->unidad
                ];
                break;


            default:
                # code...
                break;
        }
    }

    $conexion = null;
    return json_encode($data);
}

function getZonasEle($conexion)
{
    $sql = "SELECT 
                name,
                st_asgeojson(ST_Transform(ST_SetSrid(geom, 22185), 4326))::json as \"geometry\"  
            FROM gismcc.zonas_ele ze";

    $sql = $conexion->query($sql);

    $data = [];

    while ($row = $sql->fetchObject()) {
        $geometry = json_decode($row->geometry, true);
        $data['tipo'] = $geometry['type'];
        $data['data'][] = [
            'properties' => [
                'name' => $row->name,
            ],
            'type' => $geometry['type'],
            'coordinates' => $geometry['coordinates']
        ];
    }

    $conexion = null;
    return json_encode($data);
}


function getPoligonosAux($conexion)
{
    $sql = "SELECT 
                color,
                st_asgeojson(ST_Transform(ST_SetSrid(ST_Force2d(the_geom), 22185), 4326))::json as \"geometry\"  
            FROM app.poligonos_auxiliares pa 
            WHERE the_geom is not null";

    $sql = $conexion->query($sql);

    $data = [];

    while ($row = $sql->fetchObject()) {
        $geometry = json_decode($row->geometry, true);
        $data['tipo'] = $geometry['type'];
        $data['data'][] = [
            'properties' => [
                'color' => $row->color
            ],
            'type' => $geometry['type'],
            'coordinates' => $geometry['coordinates']
        ];
    }

    $conexion = null;
    return json_encode($data);
}

function login($conexion)
{
    $usuario =  pg_escape_string($_POST['usuario']);
    $password = pg_escape_string($_POST['password']);

    $sql_usuario = "SELECT count(*) 
                    FROM gismcc.usuario u
                    INNER JOIN gismcc.rel_usuario_sistema rus
                    ON u.login = rus.login
                    WHERE u.login = '$usuario' AND rus.id_sistema = " . APP_ID;
    $sql_usuario = $conexion->query($sql_usuario);
    $result = $sql_usuario->fetchObject();
    if ($result->count > 0) {
        $sql = "SELECT clave FROM gismcc.usuario u WHERE u.login = '$usuario'";
        $sql = $conexion->query($sql);
        $clave = $sql->fetchObject();
        if ($clave->clave == md5($password)) {
            $_SESSION['usuario'] = $usuario;
            header('Location: ../index.php');
        } else {
            $_SESSION['message'] = 2;
            header('Location: ../login.php');
        }
    } else {
        $_SESSION['message'] = 1;
        header('Location: ../login.php');
    }

    $conexion = null;
}

function getParcelasMuni($conexion)
{
    $sql = $conexion->query("SELECT 
                            t1.*,
                            st_asgeojson( st_transform( st_setsrid(the_geom, 22185), 4326 ) ) as \"geometry\"
                                FROM gismcc.parcelas as t1 
                               WHERE t1.razsoc in ( 'MUNICIPALIDAD DE LA CIUDAD DE CORRIENTES' , 'CAJA MUNICIPAL DE PRESTAMOS', 'RESERVA MUNICPAL') or estado_objeto in (   'DOM PUB, RSV MUN',  'MUNICIPALIDAD' ) ");
   

    $data['type'] = 'FeatureCollection';
    $data['features'] = [];

    while ($row = $sql->fetchObject()) {
        $geometry = json_decode($row->geometry, true);
        $data['features'][] = [
            'type' => 'Feature',
            'geometry' => [
                'type' => $geometry['type'],
                'coordinates' => $geometry['coordinates'],
            ],
            'properties' => [
                'gid' => $row->gid,
                'adrema' => $row->adrema,
                'razsoc' => $row->razsoc,
                'cuit' => $row->cuit,
                'mzd' => $row->mzd,
                'mzh' => $row->mzh,
                'lote' => $row->lote,
                'loteal' => $row->loteal,
                'letra' => $row->letra,
                'descripcio' => $row->descripcio,
                'puerta' => $row->puerta,
                'piso' => $row->piso,
                'dpto' => $row->dpto,
                'baldio' => $row->baldio,
                'frente' => $row->frente,
                'fondo' => $row->fondo,
                'clase_obj' => $row->clase_obj
            ]
        ];
    }

    
    $conexion = null;
    return json_encode($data);

}


$query = isset($_GET['query']) ? $_GET['query'] : false;


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if ($query == 'totales') {

        isLogged();
        $response = totales($conexion);
        echo $response;
    } else if ($query == 'zonas_ele') {

        isLogged();
        $response = getZonasEle($conexion);
        echo $response;
    } else if ($query == 'poligonos_aux') {

        isLogged();
        $response = getPoligonosAux($conexion);
        echo $response;
    } else if ($query == 'parcelas_muni') {

        isLogged();
        $response = getParcelasMuni($conexion);
        echo $response;
    } else if (isset($_GET['action']) && $_GET['action'] == 'logout') {

        unset($_SESSION['usuario']);
        header('Location: ../login.php');
    } else if (isset($_GET['obra']) && $_GET['obra'] != '') {

        isLogged();
        $response = getObras($conexion);
        echo $response;
    } else if (isset($_GET['action']) && $_GET['action'] == 'login') {

        header('Location: ../login.php');
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_GET['action']) && $_GET['action'] == 'login') {
        login($conexion);
    }
}

$conexion = null;
