<?php
session_name('privado_v2');
session_start();

if (!isset($_SESSION['usuario'])) header('Location: login.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/leaflet.css">
  <link rel="stylesheet" href="css/L.Control.Locate.min.css">
  <link rel="stylesheet" href="css/qgis2web.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/estilo.css">
  <link rel="stylesheet" href="css/mly.css">
  <link rel="stylesheet" href="css/gog.css">

  <!-- MAPILLARY -->
  <link href='https://unpkg.com/mapillary-js@2.20.0/dist/mapillary.min.css' rel='stylesheet' />
  <script src='https://unpkg.com/mapillary-js@2.20.0/dist/mapillary.min.js'></script>

  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDZIv_HnJ9bRjwc3Yju-9dhy4Nmr3vmoBo"></script>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.3.8/jstree.min.js"></script>

  <link rel="stylesheet" href="jquery-ui/jquery-ui.min.css">
  <script src="jquery-ui/jquery-ui.min.js"></script>

  <!-- TABLE TO EXCEL -->
  <script src="js/jquery.tableToExcel.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

  <link rel="stylesheet" href="snackbar/snackbar.min.css">
  <script src="snackbar/snackbar.min.js"></script>


  <title>PRIVADO V2</title>
</head>

<body>



  <?php
  include('includes/loader.php');
  /* include('includes/tabla-resultados.php'); */
  include('includes/modal-prueba.html');
  ?>



  <div id="map"></div>
  <div id="mly-container" class="">

    <i class="fa fa-times" id="cerrarVisorMapillary"></i>
    <div id="mly"></div>
  </div>

  <div id="toggleResumen">
    <i class="fa fa-info"></i>
  </div>


  <div id="resumenContainer">
    <div id="resumen">
      <div id="loaderResumen">
        <i class="fa fa-circle-notch fa-spin"></i>
      </div>
      <ul class="list-group mb-2"></ul>
    </div>
  </div>


  <!-- menu hamburguesa -->
  <div id="contenedor-hamburguesa">
    <div id="botonmax">
      <div id="botonmax-simple" style="text-align: left;">
        <div id="botonmax-simple-root botonmax-activo">
          <div class="cajabusqueda-caja-contenedor">
            <button id="btn-abrir" class="icono-hamburgesa"> </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ARBOL DE CAPAS -->
  <div id="lateral" class="abierto">
    <!-- div style="display: block;" -->
    <div id="contraer">
      <button id="btn-contraer" class="sprite-arrow"> </button>
    </div>

    <div class="topBanner">
      <span>
        <img src="images/topBanner.jpg" alt="Municipalidad de Corrientes">
      </span>
    </div>

    <!-- contenedor para el arbol -->
    <div id="contenedorArboles">

      <a href="backend/api.php?action=logout" class="btn btn-block btn-dark mt-3 mb-3">Salir</a>

      <!-- BUSCADOR -->
      <div class="input-group mb-3">
        <input list="autocompleteList" type="text" id="input-busqueda" class="form-control shadow-none" autocomplete="off" placeholder="Buscar calle, ej: Mendoza" aria-label="" aria-describedby="basic-addon2">
        <datalist id="autocompleteList"></datalist>
        <div class="input-group-append d-none" id="btnBorrarResultados">
          <span class="input-group-text"><i class="fa fa-times"></i></span>
        </div>
        <div class="input-group-append">
          <span class="input-group-text" id="btnBuscar"><i class="fa fa-search"></i></span>
        </div>

      </div>


      <!-- OPCIONES DE BUSCADOR -->
      <div id="opciones" class="oculto" style="text-align: center; width: 90%; margin:0 auto;">
        <i id="cerrarOpciones" class="fa fa-times"></i>
        <div class="btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-block btn-outline-primary">
            <input type="radio" name="opciones_busca-radio" id="opciones_busca-calle" checked autocomplete="off" value="Calle"> Calle
          </label>
          <label class="btn btn-block btn-outline-primary ">
            <input type="radio" name="opciones_busca-radio" id="opciones_busca-barrio" autocomplete="off" value="Barrio"> Barrio
          </label>
          <label class="btn btn-block btn-outline-primary ">
            <input type="radio" name="opciones_busca-radio" id="opciones_busca-partidainmo" autocomplete="off" value="partida inmo">Partida Inmobiliaria
          </label>
          <label class="btn btn-block btn-outline-primary ">
            <input type="radio" name="opciones_busca-radio" id="opciones_busca-depmunicipal" autocomplete="off" value="dependencia municipal"> Dep. Municipal
          </label>
          <label class="btn btn-block btn-outline-primary ">
            <input type="radio" name="opciones_busca-radio" id="opciones_busca-intersección" autocomplete="off" value="interseccion"> Intersección
          </label>
          <label class="btn btn-block btn-outline-primary ">
            <input type="radio" name="opciones_busca-radio" id="opciones_busca-plazas" autocomplete="off" value="plaza"> Plazas
          </label>
          <label class="btn btn-block btn-outline-primary ">
            <input type="radio" name="opciones_busca-radio" id="opciones_busca-razsoc" autocomplete="off" value="razsoc"> Razón Social
          </label>
          <label class="btn btn-block btn-outline-primary ">
            <input type="radio" name="opciones_busca-radio" id="opciones_busca-cuit" autocomplete="off" value="cuit"> Cuit
          </label>
          <label class="btn btn-block btn-outline-primary ">
            <input type="radio" name="opciones_busca-radio" id="opciones_busca-mensura" autocomplete="off" value="mensura"> Mensura
          </label>
          <label class="btn btn-block btn-outline-primary ">
            <input type="radio" name="opciones_busca-radio" id="opciones_busca-url" autocomplete="off" value="url"> Google URL
          </label>
          <label class="btn btn-block btn-outline-primary ">
            <input type="radio" name="opciones_busca-radio" id="opciones_busca-coord" autocomplete="off" value="coord"> Coordenadas
          </label>
        </div>
      </div>


      <div id="arbolCapaBase">
        <!-- incluyo capas base -->
        <?php include("includes/tree_capa_base.php"); ?>
      </div>

      <div id="arbolMCC">
        <!-- arbol de capa publico -->
        <?php include("includes/tree_publico.php"); ?>
      </div>
    </div>

  </div>

  <script src="leaflet/leaflet.js"></script>
  <script src="leaflet/L.Control.Locate.min.js"></script>
  <script src="leaflet/leaflet.rotatedMarker.js"></script>
  <script src="leaflet/leaflet-hash.js"></script>

  <script src="leaflet/leaflet.wms.js"></script>

  <script src="https://unpkg.com/leaflet.vectorgrid@latest/dist/Leaflet.VectorGrid.bundled.js"></script>


  <script src="leaflet/infowindow.js"></script>
  <script src="leaflet/capas.js"></script>
  <script src="leaflet/layer-styles.js"></script>
  <script src="js/functions.js"></script>
  <script src="js/ui-events.js"></script>
  <script src="js/darkmode.js"></script>
  <script src="js/main.js" type="module"></script>
  <script src="js/checkss.js"></script>

</body>

</html>
