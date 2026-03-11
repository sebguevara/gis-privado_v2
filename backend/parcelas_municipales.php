<?php

require_once('./conexion.php');

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
            'mzh' => $row->mzh
        ]
    ];
}

echo json_encode($data);

$conexion = null;