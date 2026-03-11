<?php

function createGeojson($row)
{
  $geometry = json_decode($row->geometry, true);
  return [
    "type" => "Feature",
    "geometry" => [
      "type" => $geometry["type"],
      "coordinates" => $geometry["coordinates"]
    ],
    "properties" => [
      "adrema" => $row->adrema,
      "razsoc" => $row->razsoc,
      "cuit"   => $row->cuit,
      "frente" => $row->frente,
      "fondo"  => $row->fondo,
      "barrio" => $row->barrio,
      "descripcion" => $row->descripcio,
      "puerta" => $row->puerta,
      "resp" => $row->resp,
      "cuit_resp" => $row->cuit_resp
    ]

  ];
}

function buscarCuitOrazsoc($conexion, $search, $filter)
{

  if ($filter == 'razsoc') {
    $search = trim(strtoupper($search));
    $filter = "t3.razsoc LIKE '%$search%'";
  } elseif ($filter == 'cuit') {
    $filter = "t3.cuit = '$search'";
  } elseif ($filter == 'mensura') {
    $filter = "t3.mensura = '$search'";
  }

  $sql = "SELECT
                t3.adrema,
                t3.cuit,
                t3.razsoc, 
                t3.cuit, 
                t3.frente, 
                t3.fondo, 
                t3.barrio, 
                t3.descripcio, 
                t3.puerta,
                t3.mensura,
                t3.resp,
                t3.cuit_resp,
                st_asgeojson(ST_Transform(ST_SetSrid(the_geom, 22185), 4326))::json as geometry 
            FROM (
                    (
                      SELECT
                        t2.adrema,
                        t1.the_geom,
                        t2.razsoc, 
                        t2.cuit, 
                        t2.frente, 
                        t2.fondo, 
                        t2.barrio, 
                        t2.descripcio, 
                        t2.puerta,
                        t2.mensura,
                        t2.resp,
                        t2.cuit_resp::varchar
                        FROM
                            gismcc.parcelas t1,
                            gismcc.ph_parcelas t2
                        WHERE
                            ST_Intersects (t2.the_geom, t1.the_geom) 
                    )
                    UNION
                    (
                        SELECT
                            t2.adrema,
                            t2.the_geom,
                            t2.razsoc, 
                            t2.cuit, 
                            t2.frente, 
                            t2.fondo, 
                            t2.barrio, 
                            t2.descripcio, 
                            t2.puerta,
                            t2.mensura,                            
                            t2.resp,
                            t2.cuit_resp::varchar
                        FROM
                        
                            gismcc.parcelas t2
                    )
                )AS t3 
            WHERE " . $filter;

  $sql = $conexion->query($sql);

  $res = [];

  if ($sql->rowCount() > 0) {
    while ($row = $sql->fetchObject()) {
      $res[] = createGeojson($row);
    }
  } else {
    $res = '-1';
  }


  $conexion = null;

  if ($res == '-1') {
    return $res;
  } else {
    return json_encode($res);
  }
}


function buscarParcelas($conexion, $search)
{
  $sql = "SELECT
                t3.adrema,
                t3.cuit,
                t3.razsoc, 
                t3.cuit, 
                t3.frente, 
                t3.fondo, 
                t3.barrio, 
                t3.descripcio, 
                t3.puerta,
                t3.mensura,
                st_asgeojson(ST_Transform(ST_SetSrid(the_geom, 22185), 4326))::json as geometry 
            FROM (
                    (
                        SELECT
                        t2.adrema,
                        t1.the_geom,
                        t2.razsoc, 
                        t2.cuit, 
                        t2.frente, 
                        t2.fondo, 
                        t2.barrio, 
                        t2.descripcio, 
                        t2.puerta,
                        t2.mensura
                        FROM
                            gismcc.parcelas t1,
                            gismcc.ph_parcelas t2
                        WHERE
                            ST_Intersects (t2.the_geom, t1.the_geom) 
                    )
                    UNION
                    (
                        SELECT
                            t2.adrema,
                            t2.the_geom,
                            t2.razsoc, 
                            t2.cuit, 
                            t2.frente, 
                            t2.fondo, 
                            t2.barrio, 
                            t2.descripcio, 
                            t2.puerta,
                            t2.mensura
                        FROM
                        
                            gismcc.parcelas t2
                    )
                )AS t3 
            WHERE (t3.razsoc = '$search') OR (t3.mensura = '$search') OR (t3.cuit = '$search') OR (t3.adrema = '$search')";

  $sql = $conexion->query($sql);

  $res = [];

  if ($sql->rowCount() > 0) {
    while ($row = $sql->fetchObject()) {
      $res[] = createGeojson($row);
    }
  } else {
    $res = '-1';
  }


  $conexion = null;

  if ($res == '-1') {
    return $res;
  } else {
    return json_encode($res);
  }
}
