<?php

//Esta función es llamada en el archivo rec_elem.php
function calleYaltura($c, $conn)
{

    $busqueda_original = $c;

    $c = explode(' ',$c);

    if(count($c) <= 1) return false;

    $altura_buscada = array_pop($c);
    $altura_buscada .= '.0';
    $calle_buscada = strtoupper(trim(implode(' ',$c)));

    $query_altura = "WITH a1 AS(
                                    SELECT id_secuencia_traza, altura FROM gismcc.calles
                                    WHERE calles.id_traza = (SELECT id_traza FROM gismcc.calles WHERE translate(calles.nombre_calles, 'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ', 'aeiouAEIOUaeiouAEIOU') ILIKE '%$calle_buscada%' LIMIT 1)
                                    AND altura < $altura_buscada
                                    ORDER BY altura DESC
                                    LIMIT 1
                                )

    SELECT DISTINCT
        calles.id_secuencia_traza,
        calles.altura AS altura_hasta,
        a1.altura AS altura_desde
    FROM gismcc.calles, a1
    WHERE calles.id_secuencia_traza  = (a1.id_secuencia_traza + 1) AND calles.altura > a1.altura
    ORDER BY calles.altura
    LIMIT 1";

    $query_altura = $conn->prepare($query_altura);
    $query_altura->execute();

    if($query_altura->rowCount() != 0){
        while ($row = $query_altura->fetch(PDO::FETCH_ASSOC)) {
            $altura_desde = $row['altura_desde'];
            $altura_hasta = $row['altura_hasta'];
        }
    }else{
        $altura_desde = $altura_buscada;
        $altura_hasta = $altura_buscada + 1 ;
        //return false;
    };


    // $porcentaje = (($altura_buscada - $altura_desde) / 100);

    $query_claudio = "WITH a as(
                                    SELECT
                                    the_geom_calles AS the_line,
                                    altura,
                                    nombre_calles,
                                    (CASE
                                        WHEN ST_Y(ST_StartPoint(the_geom_calles)) > ST_Y(ST_endPoint(the_geom_calles))
                                        THEN
                                            (($altura_buscada-$altura_desde)/100)
                                        ELSE
                                            1-(($altura_buscada-$altura_desde)/100)
                                    END) as porcentaje
                                    FROM gismcc.calles
                                    WHERE calles.id_traza = (SELECT id_traza FROM gismcc.calles WHERE translate(calles.nombre_calles, 'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ', 'aeiouAEIOUaeiouAEIOU') ILIKE '%$calle_buscada%' LIMIT 1)
                                    AND altura BETWEEN $altura_desde AND ($altura_hasta - 1)
                                )
    SELECT ST_X(ST_Transform(ST_Line_Interpolate_Point(the_line,
                                                (CASE
                                                    WHEN ST_Y(ST_StartPoint(a.the_line)) > ST_Y(ST_endPoint(a.the_line))
                                                    THEN
                                                        (($altura_buscada-$altura_desde)/100)
                                                    ELSE
                                                        1-(($altura_buscada-$altura_desde)/100)
                                                END)
                                        ),4326)
                        ) as longitud,
    ST_Y(sT_Transform(ST_Line_Interpolate_Point(a.the_line,
                                                (CASE
                                                        WHEN ST_Y(ST_StartPoint(the_line)) > ST_Y(ST_endPoint(a.the_line))
                                                    THEN
                                                                (($altura_buscada-$altura_desde)/100)
                                                        ELSE
                                                                1-(($altura_buscada-$altura_desde)/100)
                                                    END)
                                                ),4326)
    ) as latitud, nombre_calles, altura, the_line, porcentaje FROM a";

    $query_claudio = $conn->prepare($query_claudio);
    $query_claudio->execute();

    $the_line = '';
    $porcentaje = '';

    while($row = $query_claudio->fetch(PDO::FETCH_ASSOC)){
        $the_line = $row['the_line'];
        $porcentaje = $row['porcentaje'];
    }


    if($porcentaje && $porcentaje != null && $porcentaje != ''){
        $query_geom_punto = "SELECT ST_Transform(foo.geom, 4326) as geom FROM (SELECT ST_Line_Interpolate_Point('$the_line', $porcentaje) AS geom) AS foo";

        $query_geom_punto = $conn->prepare($query_geom_punto);
        $query_geom_punto->execute();

        while ($row = $query_geom_punto->fetch(PDO::FETCH_ASSOC)) {
            $geom = $row['geom'];
        }

        $query_latlon = "SELECT ST_X(ST_Transform(" . "'$geom'" . "::geometry, 4326)) as long,
                                ST_Y(ST_Transform(" . "'$geom'" . "::geometry, 4326)) as lat";

        $query_latlon = $conn->prepare($query_latlon);
        $query_latlon->execute();

        if($query_latlon->rowCount() != 0){
            while ($row = $query_latlon->fetch(PDO::FETCH_ASSOC)) {
                $lat = $row['lat'];
                $long = $row['long'];
            }

            $response = [
                [
                'name' => $busqueda_original,
                    'type' => 'Point',
                    'coordinates' => [$long, $lat]
                ]
            ];
        }else{
            $response = false;
        }
    }else{
        $response = false;
    }

    


    $conn = null;
    return $response;
}
