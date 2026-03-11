<?php
/* ======================================ESTILOS ============================== */

$cloaca_social_style = [
    "color" => "#855336",
    "weight" => 2,
    "opacity" => 0.99
];

$cordon_cuneta_style = [
    "color"=> "#A747A5",
    "weight"=> 2,
    "opacity"=> 0.99
];

$obras_enripiado_style = [
    "color"=> "#E8B00E",
    "weight"=> 2,
    "opacity"=> 0.99
];

$pavimento_style = [
    "color"=> "#FC3E3E",
    "weight"=> 2,
    "opacity"=> 0.99,
];

$recapado_style = [
    "color"=> "#FB8C3F",
    "weight"=> 2,
    "opacity"=> 0.99
];

$rehabilitacion_pluviales_style = [
    "color"=> "#03E5FC",
    "weight"=> 2,
    "opacity"=> 0.99
];

$tubos_style = [
    "color"=> "#01C00D",
    "weight"=> 3,
    "opacity"=> 0.99
];

$veredas_style =  [
    "color"=> "#2D3AFD",
    "weight"=> 2,
    "opacity"=> 0.99
];

$reparacion_cordones_style = [
    "radius" => 4,
    "fillColor" => "#FE59C4",
    "color" => "#DD008F",
    "weight" => 1,
    "opacity" => 1,
    "fillOpacity" => 0.8
];

$intervencion_plazas_style =  [
    "radius"=> 4,
    "fillColor"=> "#048C00",
    "color"=> "#036500",
    "weight"=> 1,
    "opacity"=> 1,
    "fillOpacity"=> 0.8 
];



$led_style =  [
    "radius"=> 4,
    "fillColor"=> "#FADC02",
    "color"=> "#FFF",
    "weight"=> 1,   
    "opacity"=> 1,
    "fillOpacity"=> 0.8
];

$sumideros_style = [
    "radius"=> 4,
    "fillColor"=> "#00BBFC",
    "color"=> "#05A9C6",
    "weight"=> 1,
    "opacity"=> 1,
    "fillOpacity"=> 0.8
];

$bacheo_style = [
    "radius" => 4,
    "fillColor" => "#9A9A9A",
    "color" => "#6F6F6F",
    "weight" => 1,
    "opacity" => 1,
    "fillOpacity" => 0.8
];

$anio_2018_style = [
    "color" => "#FF8C00",
    "weight" => 2,
    "opacity" => 0.99
];

$anio_2019_style = [
    "color" => "#00BFFF",
    "weight" => 2,
    "opacity" => 0.99
];

$anio_2020_style = [
    "color" => "#7401DF",
    "weight" => 2,
    "opacity" => 0.99
];

$anio_2021_style = [
    "color"=> "#3CB371",
    "weight"=> 2,
    "opacity"=> 0.99
];

$fondo_muni_style = [
    "color"=> "#626567",
    "weight"=> 2,
    "opacity"=> 0.99
];

$fondo_fog_style = [
    "color" => "#3498DB",
    "weight" => 2,
    "opacity" => 0.99
];

$fondo_pro_style = [
    "color"=> "#FF69B4",
    "weight"=> 2,
    "opacity"=> 0.99
];

$proyectado_line_style = [
    "color" =>"#c1fc49",
    "weight" => 2,
    "opacity" => 1
];

$ejecucion_line_style = [
    "color"=>"#67a5db",
    "weight"=> 2,
    "opacity"=> 0.99
];

$existente_line_style = [
    "color"=> "#ff365a",
    "weight"=> 2,
    "opacity"=> 0.99
];

$proyectado_point_style = [
    "radius" => 4,
    "fillColor" => "#c1fc49",
    "color" => "#000",
    "weight" => 1,
    "opacity" => 1,
    "fillOpacity" => 0.8
];

$ejecucion_point_style = [
    "radius" => 4,
    "fillColor" => "#67a5db",
    "color" => "#000",
    "weight" => 1,
    "opacity" => 1,
    "fillOpacity" => 0.8
];

$finalizado_point_style = [
    "radius"=> 4,
    "fillColor"=> "#ff365a",
    "color"=> "#000",
    "weight"=> 1,
    "opacity"=> 1,
    "fillOpacity"=> 0.8
];



$data['obras_lineales'] = json_encode([
    "icon"=> "images/icon/folder-1-16.png", 
    "category" => "Obras Lineales"
]);

/* ================================== CLOACA SOCIAL ============================= */

$data['cloacas_social'] = json_encode([
    "icon" => "images/cloaca-social-reference.svg", 
    "category" => "Obras Lineales",
    "url" => "backend/api.php?obra=cloaca",
    "estilos" => $cloaca_social_style
]);

$data['cloacas_social_anio_2018'] = json_encode([
    "icon" => "images/_anio_2018.svg", 
    "category" => "Obras Lineales",
    "url" => "backend/api.php?obra=cloaca&anio=2018",
    "estilos" => $anio_2018_style
]);

$data["cloacas_social_anio_2019"] = json_encode([
    "icon" => "images/_anio_2019.svg", 
    "category" => "Obras Lineales",
    "url" => "backend/api.php?obra=cloaca&anio=2019",
    "estilos" => $anio_2019_style
]);

$data["cloacas_social_anio_2020"] = json_encode([
    "icon"=> "images/_anio_2020.svg", 
    "category"=>"Obras Lineales",
    "url" => "backend/api.php?obra=cloaca&anio=2020",
    "estilos" => $anio_2020_style
]);

$data["cloacas_social_anio_2021"] = json_encode([
    "icon"=> "images/_anio_2021.svg", 
    "category"=>"Obras Lineales",
    "url" =>  "backend/api.php?obra=cloaca&anio=2021",
    "estilos" => $anio_2021_style
]);



/* ========================================CORDON CUNETA============================= */

$data["cordon_cuneta"] = json_encode([
    "icon"=> "images/cordon-cuneta-reference.svg", 
    "category"=>"Obras Lineales",
    "url" => "backend/api.php?obra=cordon cuneta",
    "estilos" => $cordon_cuneta_style
]);

$data["cordon_cuneta_anio_2018"] = json_encode([
    "icon"=> "images/_anio_2018.svg", 
    "category"=>"Obras Lineales",
    "url" => "backend/api.php?obra=cordon cuneta&anio=2018",
    "estilos" => $anio_2018_style
]);

$data["cordon_cuneta_anio_2019"] = json_encode([
    "icon"=> "images/_anio_2019.svg", 
    "category"=>"Obras Lineales",
    "url" => "backend/api.php?obra=cordon cuneta&anio=2019",
    "estilos" => $anio_2019_style
]);

$data["cordon_cuneta_anio_2020"] = json_encode([
    "icon"=> "images/_anio_2020.svg", 
    "category"=>"Obras Lineales",
    "url" => "backend/api.php?obra=cordon cuneta&anio=2020",
    "estilos" => $anio_2020_style
]);

$data["cordon_cuneta_anio_2021"] = json_encode([
    "icon"=> "images/_anio_2021.svg", 
    "category"=>"Obras Lineales",
    "url" => "backend/api.php?obra=cordon cuneta&anio=2021",
    "estilos" => $anio_2021_style
]);

$data['cordon_cuneta_fondo_muni'] =  json_encode([
    "icon" => "images/_fondo_muni.svg",
    "url" => "backend/api.php?obra=cordon cuneta&fondo=muni",
    "estilos" => $fondo_muni_style
]);

$data['cordon_cuneta_fondo_pro'] = json_encode([
    "icon" => "images/_fondo_pro.svg",
    "url" => "backend/api.php?obra=cordon cuneta&fondo=prov",
    "estilos" => $fondo_pro_style
]);

$data['cordon_cuneta_fondo_fog'] = json_encode([
    "icon"=> "images/_fondo_fog.svg",
    "url" => "backend/api.php?obra=cordon cuneta&fondo=fogop",
    "estilos" => $fondo_fog_style
]);

$data['cordon_cuneta_proyectado'] = json_encode([
    "icon"=> "images/_proyectado_line.svg",
    "url" => "backend/api.php?obra=cordon cuneta&estado=proyectado",
    "estilos" => $proyectado_line_style
]);

$data['cordon_cuneta_ejecucion'] = json_encode([
    "icon"=> "images/_ejecucion_line.svg",
    "url" => "backend/api.php?obra=cordon cuneta&estado=ejecucion",
    "estilos" => $ejecucion_line_style
]);

$data['cordon_cuneta_existente'] = json_encode([
    "icon"=> "images/_existente_line.svg",
    "url" => "backend/api.php?obra=cordon cuneta&estado=existente",
    "estilos" => $existente_line_style
]);


/* ================================ OBRAS DE ENRIPIADO ======================== */

$data['obras_enripiado'] = json_encode([
    "icon"=> "images/enripiado-reference.svg",
    "url" => "backend/api.php?obra=enripiado",
    "estilos" => $obras_enripiado_style
]);

$data['obras_enripiado_anio_2018'] = json_encode([
    "icon"=> "images/_anio_2018.svg",
    "url" => "backend/api.php?obra=enripiado&anio=2018",
    "estilos" => $anio_2018_style
]);

$data['obras_enripiado_anio_2019'] = json_encode([
    "icon"=> "images/_anio_2019.svg",
    "url" => "backend/api.php?obra=enripiado&anio=2019",
    "estilos" => $anio_2019_style
]);

$data['obras_enripiado_anio_2020'] = json_encode([
    "icon"=> "images/_anio_2020.svg",
    "url" => "backend/api.php?obra=enripiado&anio=2020",
    "estilos" => $anio_2020_style
]);

$data['obras_enripiado_anio_2021'] = json_encode([
    "icon"=> "images/_anio_2021.svg",
    "url" => "backend/api.php?obra=enripiado&anio=2021",
    "estilos" => $anio_2021_style
]);

$data['obras_enripiado_fondo_muni'] =  json_encode([
    "icon" => "images/_fondo_muni.svg",
    "url" => "backend/api.php?obra=enripiado&fondo=muni",
    "estilos" => $fondo_muni_style
]);

$data['obras_enripiado_fondo_pro'] = json_encode([
    "icon" => "images/_fondo_pro.svg",
    "url" => "backend/api.php?obra=enripiado&fondo=prov",
    "estilos" => $fondo_pro_style
]);

$data['obras_enripiado_fondo_fog'] = json_encode([
    "icon"=> "images/_fondo_fog.svg",
    "url" => "backend/api.php?obra=enripiado&fondo=fogop",
    "estilos" => $fondo_fog_style
]);

$data['obras_enripiado_proyectado'] = json_encode([
    "icon"=> "images/_proyectado_line.svg",
    "url" => "backend/api.php?obra=enripiado&estado=proyectado",
    "estilos" => $proyectado_line_style
]);

$data['obras_enripiado_ejecucion'] = json_encode([
    "icon"=> "images/_ejecucion_line.svg",
    "url" => "backend/api.php?obra=enripiado&estado=ejecucion",
    "estilos" => $ejecucion_line_style
]);

$data['obras_enripiado_finalizado'] = json_encode([
    "icon"=> "images/_existente_line.svg",
    "url" => "backend/api.php?obra=enripiado&estado=existente",
    "estilos" => $existente_line_style
]);


/* ====================================== PAVIMENTO ========================== */

$data['pavimento'] = json_encode([
    "icon"=> "images/pavimento-reference.svg",
    "url" => "backend/api.php?obra=pavimento",
    "estilos" => $pavimento_style
]);

$data['pavimento_anio_2018'] = json_encode([
    "icon"=> "images/_anio_2018.svg",
    "url" => "backend/api.php?obra=pavimento&anio=2018",
    "estilos" => $anio_2018_style
]);

$data['pavimento_anio_2019'] = json_encode([
    "icon"=> "images/_anio_2019.svg",
    "url" => "backend/api.php?obra=pavimento&anio=2019",
    "estilos" => $anio_2019_style
]);

$data['pavimento_anio_2020'] = json_encode([
    "icon"=> "images/_anio_2020.svg",
    "url" => "backend/api.php?obra=pavimento&anio=2020",
    "estilos" => $anio_2020_style
]);

$data['pavimento_anio_2021'] = json_encode([
    "icon"=> "images/_anio_2021.svg",
    "url" => "backend/api.php?obra=pavimento&anio=2021",
    "estilos" => $anio_2021_style
]);

$data['pavimento_fondo_muni'] = json_encode([
    "icon"=> "images/_fondo_muni.svg",
    "url" => "backend/api.php?obra=pavimento&fondo=muni",
    "estilos" => $fondo_muni_style
]);

$data['pavimento_fondo_pro'] = json_encode([
    "icon"=> "images/_fondo_pro.svg",
    "url" => "backend/api.php?obra=pavimento&fondo=prov",
    "estilos" => $fondo_pro_style
]);

$data['pavimento_fondo_fog'] = json_encode([
    "icon"=> "images/_fondo_fog.svg",
    "url" => "backend/api.php?obra=pavimento&fondo=fogop",
    "estilos" => $fondo_fog_style
]);


/* ===================================== RECAPADO ============================ */ 

$data['recapado'] = json_encode([
    "icon"=> "images/recapado-reference.svg",
    "url" => "backend/api.php?obra=recapado",
    "estilos" => $recapado_style
]);

$data['recapado_anio_2018'] = json_encode([
    "icon"=> "images/_anio_2018.svg",
    "url" => "backend/api.php?obra=recapado&anio=2018",
    "estilos" => $anio_2018_style
]);

$data['recapado_anio_2019'] = json_encode([
    "icon"=> "images/_anio_2019.svg",
    "url" => "backend/api.php?obra=recapado&anio=2019",
    "estilos" => $anio_2019_style
]);

$data['recapado_anio_2020'] = json_encode([
    "icon"=> "images/_anio_2020.svg",
    "url" => "backend/api.php?obra=recapado&anio=2020",
    "estilos" => $anio_2020_style
]);

$data['recapado_anio_2021'] = json_encode([
    "icon"=> "images/_anio_2021.svg",
    "url" => "backend/api.php?obra=recapado&anio=2021",
    "estilos" => $anio_2021_style
]);

/* ================================== REHABILITACION DE PLUVIALES ============== */

$data['rehabilitacion_pluviales'] = json_encode([
    "icon"=> "images/pluviales-reference.svg",
    "url" => "backend/api.php?obra=rehabilitacion de pluviales",
    "estilos" => $rehabilitacion_pluviales_style
]);

$data['rehabilitacion_pluviales_anio_2018'] = json_encode([
    "icon"=> "images/_anio_2018.svg",
    "url" => "backend/api.php?obra=rehabilitacion de pluviales&anio=2018",
    "estilos" => $anio_2018_style
]);

$data['rehabilitacion_pluviales_anio_2019'] = json_encode([
    "icon"=> "images/_anio_2019.svg",
    "url" => "backend/api.php?obra=rehabilitacion de pluviales&anio=2019",
    "estilos" => $anio_2019_style
]);

$data['rehabilitacion_pluviales_anio_2020'] = json_encode([
    "icon"=> "images/_anio_2020.svg",
    "url" => "backend/api.php?obra=rehabilitacion de pluviales&anio=2020",
    "estilos" => $anio_2020_style
]);

$data['rehabilitacion_pluviales_anio_2021'] = json_encode([
    "icon"=> "images/_anio_2021.svg",
    "url" => "backend/api.php?obra=rehabilitacion de pluviales&anio=2021",
    "estilos" => $anio_2021_style
]);

/* ================================ TUBOS DE ACCESO A DOMICILIO =============== */

$data['tubos_acceso_dom'] = json_encode([
    "icon"=> "images/tubos-reference.svg",
    "url" => "backend/api.php?obra=entubado de acceso domiciliario",
    "estilos" => $tubos_style
]);

$data['tubos_acceso_dom_anio_2018'] = json_encode([
    "icon"=> "images/_anio_2018.svg",
    "url" => "backend/api.php?obra=entubado de acceso domiciliario&anio=2018",
    "estilos" => $anio_2018_style
]);

$data['tubos_acceso_dom_anio_2019'] = json_encode([
    "icon"=> "images/_anio_2019.svg",
    "url" => "backend/api.php?obra=entubado de acceso domiciliario&anio=2019",
    "estilos" => $anio_2019_style
]);

$data['tubos_acceso_dom_anio_2020'] = json_encode([
    "icon"=> "images/_anio_2020.svg",
    "url" => "backend/api.php?obra=entubado de acceso domiciliario&anio=2020",
    "estilos" => $anio_2020_style
]);

$data['tubos_acceso_dom_anio_2021'] = json_encode([
    "icon"=> "images/_anio_2021.svg",
    "url" => "backend/api.php?obra=entubado de acceso domiciliario&anio=2021",
    "estilos" => $anio_2021_style
]);

/* =============================== TUBOS CRUCE DE CALLE ===================== */

$data['tubos_cruce_calle'] = json_encode([
    "icon"=> "images/tubos-reference.svg",
    "url" => "backend/api.php?obra=entubado de cruce de calle",
    "estilos" => $tubos_style
]);

$data['tubos_cruce_calle_anio_2018'] = json_encode([
    "icon"=> "images/_anio_2018.svg",
    "url" => "backend/api.php?obra=entubado de cruce de calle&anio=2018",
    "estilos" => $anio_2018_style
]);

$data['tubos_cruce_calle_anio_2019'] = json_encode([
    "icon"=> "images/_anio_2019.svg",
    "url" => "backend/api.php?obra=entubado de cruce de calle&anio=2019",
    "estilos" => $anio_2019_style
]);

$data['tubos_cruce_calle_anio_2020'] = json_encode([
    "icon"=> "images/_anio_2020.svg",
    "url" => "backend/api.php?obra=entubado de cruce de calle&anio=2020",
    "estilos" => $anio_2020_style
]);

$data['tubos_cruce_calle_anio_2021'] = json_encode([
    "icon"=> "images/_anio_2021.svg",
    "url" => "backend/api.php?obra=entubado de cruce de calle&anio=2021",
    "estilos" => $anio_2021_style
]);

/* ===================================== VEREDAS ============================ */

$data['veredas'] = json_encode([
    "icon"=> "images/veredas-reference.svg",
    "url" => "backend/api.php?obra=veredas",
    "estilos" => $veredas_style
]);

$data['veredas_anio_2018'] = json_encode([
    "icon"=> "images/_anio_2018.svg",
    "url" => "backend/api.php?obra=veredas&anio=2018",
    "estilos" => $anio_2018_style
]);

$data['veredas_anio_2019'] = json_encode([
    "icon"=> "images/_anio_2019.svg",
    "url" => "backend/api.php?obra=veredas&anio=2019",
    "estilos" => $anio_2019_style
]);

$data['veredas_anio_2020'] = json_encode([
    "icon"=> "images/_anio_2020.svg",
    "url" => "backend/api.php?obra=veredas&anio=2020",
    "estilos" => $anio_2020_style
]);

$data['veredas_anio_2021'] = json_encode([
    "icon"=> "images/_anio_2021.svg",
    "url" => "backend/api.php?obra=veredas&anio=2021",
    "estilos" => $anio_2021_style
]);


/* =================================REPARACION DE CORDONES =================== */

$data['reparacion_cordones'] = json_encode([
    "icon" => "images/rep-cordones-reference.svg",
    "url" => "backend/api.php?obra=reparacion de cordones",
    "estilos" => $reparacion_cordones_style
]);

/* =================================INTERVENCION EN PLAZAS =================== */

$data['intervencion_plazas'] = json_encode([
    "icon" => "images/intervencion-plazas-reference.svg",
    "url" => "backend/api.php?obra=intervencion en plazas",
    "estilos" => $intervencion_plazas_style
]);


/* ==================================== INSTALACION DE LEDS ================== */
$data['instalacion_leds'] = json_encode([
    "icon" => "images/leds-reference.svg",
    "opened" => true,
    "url" => "backend/api.php?obra=led",
    "estilos" => $led_style
]);

$data['led_proyectado'] = json_encode([
    "icon" => "images/bacheo_proyectado.svg", 
    "category" => "Bacheo", 
    "opened" => true, 
    "estilos" => $proyectado_point_style,
    "url" => "backend/api.php?obra=led&estado=proyectado"
]);

$data['led_ejecucion'] = json_encode([
    "icon" => "images/bacheo_en_ejecucion.svg", 
    "category" => "Bacheo", 
    "opened" => true, 
    "estilos" => $ejecucion_point_style,
    "url" => "backend/api.php?obra=led&estado=ejecucion"
]);

$data['led_finalizado'] = json_encode([
    "icon" => "images/bacheo_finalizado.svg", 
    "category" => "Bacheo", 
    "opened" => true, 
    "estilos" => $finalizado_point_style,
    "url" => "backend/api.php?obra=led&estado=finalizado"
]);


/* ==================================== REHABILITACION DE SUMIDEROS ============= */

$data['rehabilitacion_sumideros'] = json_encode([
    "icon" => 'images/sumideros-reference.svg',
    "estilos" => $sumideros_style,
    "url" => "backend/api.php?obra=rehabilitacion de sumideros"
]);

/* ====================================== BACHEO ============================= */

$data['bacheo'] = json_encode([
    "icon" => "images/bacheo-reference.svg", 
    "category" => "Bacheo", 
    "opened" => true, 
    "estilos" => $bacheo_style,
    "url" => "backend/api.php?obra=bacheo"
]);

$data['bacheo_proyectado'] = json_encode([
    "icon" => "images/bacheo_proyectado.svg", 
    "category" => "Bacheo", 
    "opened" => true, 
    "estilos" => $proyectado_point_style,
    "url" => "backend/api.php?obra=bacheo&estado=proyectado"
]);

$data['bacheo_ejecucion'] = json_encode([
    "icon" => "images/bacheo_en_ejecucion.svg", 
    "category" => "Bacheo", 
    "opened" => true, 
    "estilos" => $ejecucion_point_style,
    "url" => "backend/api.php?obra=bacheo&estado=ejecucion"
]);

$data['bacheo_finalizado'] = json_encode([
    "icon" => "images/bacheo_finalizado.svg", 
    "category" => "Bacheo", 
    "opened" => true, 
    "estilos" => $finalizado_point_style,
    "url" => "backend/api.php?obra=bacheo&estado=finalizado"
]);


