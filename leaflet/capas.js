var overlay_CapabaseGIS = L.tileLayer.wms("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", {
    layers: "capa_base_mcc:capa_base",
    format: 'image/png',
    transparent: true,
    continuousWorld: true,
    tiled: true,
    opacity: 1,
    identify: false,
    attribution: '',
    maxZoom:22
});

var overlay_CapabaseGIS_dark = L.tileLayer.wms("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", {
    layers: "capa_base_mcc:capa_base_mcc_d",
    format: 'image/png',
    transparent: true,
    continuousWorld: true,
    tiled: true,
    opacity: 1,
    identify: false,
    attribution: '',
    maxZoom:22
});


var overlay_GooglecnSatellite = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    maxZoom:22
});


var overlay_GoogleRoad = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    maxZoom:22
});

var overlay_GoogleTraffic = L.tileLayer('https://mt1.google.com/vt?lyrs=h@159000000,traffic|seconds_into_week:-1&style=3&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    maxZoom:22
});

var overlay_OSMStandard = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    opacity: 1.0,
    maxZoom:22
});

var overlay_Hybrid = L.tileLayer.wms("https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
  opacity: 1.0,
  maxZoom:22
})

var capas = [];

//Capas de obras lineales


var cloacas_social_conexion_dom;


//Capas de obras puntuales

var intervencion_plazas;
//var instalacion_leds;
//Capas de obras viales
var pavimento2;
var cordon_cuneta2;
var recapado2;
var ripio;
var led_proyectado;
var zonas_ele;

var poligonos_aux;

var opcionWMS = {
    format: 'image/png',
    uppercase: true,
    transparent: true,
    version: '1.1.1',
    continuousWorld: true,
    tiled: true,
    attribution: "Direccion Gral de GIS",
    info_format: 'application/json',
    opacity: 1,
    maxZoom:22
    //CQL_FILTER: '1=1'
}

//Capas desde GEOSERVER
wmsMcc51 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS);

var vw_distritos_planeamiento_urbano = wmsMcc51.getLayer("planeamiento_urbano:vw_distritos_planeamiento_urbano");
var vw_ejido_urbano = wmsMcc51.getLayer("planeamiento_urbano:vw_ejido_urbano_rural");
var vw_medianas = wmsMcc51.getLayer("planeamiento_urbano:vw_medianas");
var vw_edificios_historicos = wmsMcc51.getLayer("planeamiento_urbano:vw_edificios_historicos");
var vw_parcelas_por_distrito = wmsMcc51.getLayer("app:vw_calculo_factibilidad");

vw_barrios = wmsMcc51.getLayer("informacion_catastral:vw_barrios_de_la_ciudad");
vw_zonas_municipales  = wmsMcc51.getLayer("desarrollo_comunitario:vw_zonas_municipales");
lyr_red_agua_potable = wmsMcc51.getLayer("infraestructura:red_agua_potable");
vw_desagues_pluviales = wmsMcc51.getLayer("infraestructura:vw_desagues_pluviales");
vw_red_desague_cloaca = wmsMcc51.getLayer("infraestructura:vw_red_de_cloaca");
vw_ide_calle_por_tipo_calzada  = wmsMcc51.getLayer("red_vial:vw_ide_calle_por_tipo_calzada");
vw_parcelas  = wmsMcc51.getLayer("informacion_catastral:vw_parcelas");
vw_asentamiento_renabap = wmsMcc51.getLayer("informacion_catastral:vw_asentamiento_renabap");

opcionWMS.CQL_FILTER = 'gid IN (351, 3070, 5075, 11065, 11589, 18493, 20805, 21465, 26223, 27516, 29679, 30254, 30517, 30569, 31351, 34600, 34607, 35088, 37826, 39985, 40002, 41863, 48217, 51811, 51893, 51937, 52037, 52038, 52105, 52238, 52284, 52365, 52417, 52904, 52943, 53852, 54071, 64383, 64622, 64623, 64624, 64722, 65071, 65563, 65568, 65569, 65571, 65572, 65573, 65633, 65677, 65698, 67864, 68431, 68605, 68692, 69150, 69563, 71459, 72256, 72473, 72961, 73049, 73199, 73894, 74278, 76215, 76318, 76512, 76517, 76654, 77278, 78019, 78465, 78562, 78939, 78942, 79125, 79150, 79419, 79740, 79957, 80394, 80431, 80441, 80728, 80745, 80746, 80779, 81026, 81084, 81093, 81115, 81120, 81132, 81212, 81231, 81232, 81250, 81265, 81287, 81288, 81294, 81297, 81334, 81631, 81642, 81649, 81662, 81674, 81681, 81686, 81689, 81896, 81902, 81971, 82007, 82143, 82148, 82159, 82161, 82165, 82182, 82183, 82185, 82190, 82202, 82206, 82211, 82295, 82301, 82633, 82645, 82662, 82766, 82880, 82932, 82946, 82957, 82959, 82960, 82967, 82983, 82990, 83010, 83016, 83024, 83234, 83287, 83319, 83681, 83692, 83818, 84140, 84383, 84620, 84631, 84642, 84645, 84648, 84658, 84684, 87848, 88820, 91321, 94301, 95598, 96692, 96713, 96816, 96868, 96897, 96939, 192370, 192503, 192504, 192532, 193042, 196917, 196967, 196968, 197003, 197009, 197141, 197168, 197246, 197679, 197864, 198001, 198108, 198265, 198278, 199860, 199975, 200307)'
opcionWMS.styles = 'parcela_2';

var parcelas_muni_baldias = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('informacion_catastral:vw_parcelas');


var parcelas_muni = undefined;

var lyrZonaDisponible = undefined;

opcionWMS.styles = '';


opcionWMS.CQL_FILTER = "obra ILIKE '%LED%'";
instalacion_leds = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_punto');


//CLOACA SOCIAL
opcionWMS.CQL_FILTER = "obra ILIKE '%cloaca%'";
cloacas_social =  new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

/* opcionWMS.CQL_FILTER = "obra ILIKE '%cloaca%' AND fondo ILIKE '%MUNI%'"
cloacas_social_fondo_muni = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cloaca%' AND fondo ILIKE '%PRO%'";
cloacas_social_fondo_pro = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');;

opcionWMS.CQL_FILTER = "obra ILIKE '%cloaca%' AND fondo ILIKE '%FOG%'";
cloacas_social_fondo_fog = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');;
 */
opcionWMS.CQL_FILTER = "obra ILIKE '%cloaca%' AND anio = 2018";
opcionWMS.styles = 'vwm_obras_todo_zona_linea_anio';

cloacas_social_anio_2018 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cloaca%' AND anio = 2019";
cloacas_social_anio_2019 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cloaca%' AND anio = 2020";
cloacas_social_anio_2020 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cloaca%' AND anio = 2021";
cloacas_social_anio_2021 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

//CORDON CUNETA
opcionWMS.CQL_FILTER = "obra ILIKE '%cordon cuneta%'";
opcionWMS.styles = '';
cordon_cuneta = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cordon cuneta%' AND anio = 2018";
opcionWMS.styles = 'vwm_obras_todo_zona_linea_anio';
cordon_cuneta_anio_2018 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cordon cuneta%' AND anio = 2019";
cordon_cuneta_anio_2019 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cordon cuneta%' AND anio = 2020";
cordon_cuneta_anio_2020 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cordon cuneta%' AND anio = 2021";
cordon_cuneta_anio_2021 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cordon cuneta%' AND fondo ILIKE '%MUNI%'";
opcionWMS.styles = 'vwm_obras_todo_zona_linea_fondo';
cordon_cuneta_fondo_muni = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cordon cuneta%' AND fondo ILIKE '%FOG%'";
cordon_cuneta_fondo_fog = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cordon cuneta%' AND fondo ILIKE '%PROV%'";
cordon_cuneta_fondo_pro = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');


opcionWMS.CQL_FILTER = "obra ILIKE '%cordon cuneta%' AND estado ILIKE '%PROYECTADO%'";
opcionWMS.styles = 'vwm_obras_todo_zona_linea_estado';
cordon_cuneta_proyectado = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cordon cuneta%' AND estado ILIKE '%EJEC%'";
cordon_cuneta_ejecucion = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%cordon cuneta%' AND estado ILIKE '%EXISTE%'";
cordon_cuneta_existente = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

//OBRAS ENRIPIADO

opcionWMS.styles = '';
opcionWMS.CQL_FILTER = "obra ILIKE '%ENRIPIADO%'";
obras_enripiado = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.styles = 'vwm_obras_todo_zona_linea_anio';
opcionWMS.CQL_FILTER = "obra ILIKE '%ENRIPIADO%' AND anio = 2018";
obras_enripiado_anio_2018 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%ENRIPIADO%' AND anio = 2019";
obras_enripiado_anio_2019 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%ENRIPIADO%' AND anio = 2020";
obras_enripiado_anio_2020 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%ENRIPIADO%' AND anio = 2021";
obras_enripiado_anio_2021 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.styles = 'vwm_obras_todo_zona_linea_fondo';
opcionWMS.CQL_FILTER = "obra ILIKE '%ENRIPIADO%' AND fondo ILIKE '%MUNI%'";
obras_enripiado_fondo_muni = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%ENRIPIADO%' AND fondo ILIKE '%FOG%'";
obras_enripiado_fondo_fog = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%ENRIPIADO%' AND fondo ILIKE '%PROV%'";
obras_enripiado_fondo_pro = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.styles = 'vwm_obras_todo_zona_linea_estado';
opcionWMS.CQL_FILTER = "obra ILIKE '%ENRIPIADO%' AND estado ILIKE '%PROYECTADO%'";
obras_enripiado_proyectado = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%ENRIPIADO%' AND estado ILIKE '%EJEC%'";
obras_enripiado_ejecucion = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%ENRIPIADO%' AND (estado ILIKE '%EXISTE%' OR estado ILIKE '%FINAL%')";
obras_enripiado_finalizado = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');


//PAVIMENTO
opcionWMS.styles = '';
opcionWMS.CQL_FILTER = "obra ILIKE '%PAVIMENTO%'";
pavimento = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.styles = 'vwm_obras_todo_zona_linea_anio';
opcionWMS.CQL_FILTER = "obra ILIKE '%PAVIMENTO%' AND anio = 2018";
pavimento_anio_2018 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%PAVIMENTO%' AND anio = 2019";
pavimento_anio_2019 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%PAVIMENTO%' AND anio = 2020";
pavimento_anio_2020 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%PAVIMENTO%' AND anio = 2021";
pavimento_anio_2021 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');


opcionWMS.styles = 'vwm_obras_todo_zona_linea_fondo';
opcionWMS.CQL_FILTER = "obra ILIKE '%PAVIMENTO%' AND fondo ILIKE '%MUNI%'";
pavimento_fondo_muni = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%PAVIMENTO%' AND fondo ILIKE '%FOG%'";
pavimento_fondo_fog = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%PAVIMENTO%' AND fondo ILIKE '%PROV%'";
pavimento_fondo_pro = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');


//RECAPADO
opcionWMS.styles = '';
opcionWMS.CQL_FILTER = "obra ILIKE '%RECAPADO%'";
recapado = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.styles = 'vwm_obras_todo_zona_linea_anio';
opcionWMS.CQL_FILTER = "obra ILIKE '%RECAPADO%' AND anio = 2018";
recapado_anio_2018 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%RECAPADO%' AND anio = 2019";
recapado_anio_2019 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%RECAPADO%' AND anio = 2020";
recapado_anio_2020 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%RECAPADO%' AND anio = 2021";
recapado_anio_2021 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');


//PLUVIALES
opcionWMS.styles = '';
opcionWMS.CQL_FILTER = "obra ILIKE '%rehabilitacion de pluviales%'";
rehabilitacion_pluviales = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.styles = 'vwm_obras_todo_zona_linea_anio';
opcionWMS.CQL_FILTER = "obra ILIKE '%rehabilitacion de pluviales%' AND anio = 2018";
rehabilitacion_pluviales_anio_2018 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%rehabilitacion de pluviales%' AND anio = 2019";
rehabilitacion_pluviales_anio_2019 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%rehabilitacion de pluviales%' AND anio = 2020";
rehabilitacion_pluviales_anio_2020 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%rehabilitacion de pluviales%' AND anio = 2021";
rehabilitacion_pluviales_anio_2021 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');


//TUBOS ACCESO DOMICILIARIO
opcionWMS.styles = '';
opcionWMS.CQL_FILTER = "obra ILIKE '%entubado de acceso domiciliario%'";
tubos_acceso_dom = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.styles = 'vwm_obras_todo_zona_linea_anio';
opcionWMS.CQL_FILTER = "obra ILIKE '%entubado de acceso domiciliario%' AND anio = 2018";
tubos_acceso_dom_anio_2018 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%entubado de acceso domiciliario%' AND anio = 2019";
tubos_acceso_dom_anio_2019 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%entubado de acceso domiciliario%' AND anio = 2020";
tubos_acceso_dom_anio_2020 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%entubado de acceso domiciliario%' AND anio = 2021";
tubos_acceso_dom_anio_2021 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');


//TUBOS CRUCE CALLE
opcionWMS.styles = '';
opcionWMS.CQL_FILTER = "obra ILIKE '%entubado de cruce de calle%'";
tubos_cruce_calle = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.styles = 'vwm_obras_todo_zona_linea_anio';
opcionWMS.CQL_FILTER = "obra ILIKE '%entubado de cruce de calle%' AND anio = 2018";
tubos_cruce_calle_anio_2018 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%entubado de cruce de calle%' AND anio = 2019";
tubos_cruce_calle_anio_2019 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%entubado de cruce de calle%' AND anio = 2020";
tubos_cruce_calle_anio_2020 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%entubado de cruce de calle%' AND anio = 2021";
tubos_cruce_calle_anio_2021 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');


//VEREDAS
opcionWMS.styles = '';
opcionWMS.CQL_FILTER = "obra ILIKE '%veredas%'";
veredas = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.styles = 'vwm_obras_todo_zona_linea_anio';
opcionWMS.CQL_FILTER = "obra ILIKE '%veredas%' AND anio = 2018";
veredas_anio_2018 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%veredas%' AND anio = 2019";
veredas_anio_2019 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%veredas%' AND anio = 2020";
veredas_anio_2020 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');

opcionWMS.CQL_FILTER = "obra ILIKE '%veredas%' AND anio = 2021";
veredas_anio_2021 = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_linea');


//REPARACION CORDONES
opcionWMS.styles = '';
opcionWMS.CQL_FILTER = "obra ILIKE '%cordones%'";
reparacion_cordones = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_punto');

//INSTALACION DE LEDS
opcionWMS.CQL_FILTER = "obra ILIKE '%LED%'";
instalacion_leds = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_punto');

opcionWMS.styles = 'vwm_obras_todo_zona_punto_estado';
//opcionWMS.CQL_FILTER = "obra ILIKE '%LED%' and estado ILIKE '%PROYEC%'";
//led_proyectado = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_punto');

opcionWMS.CQL_FILTER = "obra ILIKE '%LED%' and estado ILIKE '%EJEC%'";
led_ejecucion = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_punto');

opcionWMS.CQL_FILTER = "obra ILIKE '%LED%' and estado ILIKE '%FINAL%'";
led_finalizado = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_punto');

//INTERVENCION EN PLAZAS
opcionWMS.styles = '';
opcionWMS.CQL_FILTER = "obra ILIKE '%intervencion en plazas%'";
intervencion_plazas = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_punto');


//SUMIDEROS
opcionWMS.CQL_FILTER = "obra ILIKE '%rehabilitacion de sumideros%'";
rehabilitacion_sumideros = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_punto');

//BACHEO
opcionWMS.CQL_FILTER = "obra ILIKE '%bacheo%'";
bacheo = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_punto');

opcionWMS.styles = 'vwm_obras_todo_zona_punto_estado';
opcionWMS.CQL_FILTER = "obra ILIKE '%bacheo%' and estado ILIKE '%EJEC%'";
bacheo_ejecucion = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_punto');

opcionWMS.CQL_FILTER = "obra ILIKE '%bacheo%' and estado ILIKE '%FINAL%'";
bacheo_finalizado = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_punto');

opcionWMS.CQL_FILTER = "obra ILIKE '%bacheo%' and estado ILIKE '%PROYECT%'";
bacheo_proyectado = new wms_GIS("https://gisdesa.ciudaddecorrientes.gov.ar:8282/geoserver/wms?", opcionWMS).getLayer('app:vwm_obras_todo_zona_punto');



