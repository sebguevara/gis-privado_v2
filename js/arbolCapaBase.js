import map from './map.js';

const arbolCapaBase = (function (map) {
  var nodo_base_anterior, nodoSeleccionado;
  var arbol = $('#arbolCapaBase');

  function init() {
    arbol.jstree({
      "core": {
        "animation": 0,
        "string": {
          'Loading ...': 'Cargando ...'
        }
      },
      "checkbox": {
        "keep_selected_style": true
      },
      "plugins": ["checkbox", "wholerow"]
    }).on('changed.jstree', function (e, data) {
      nodoSeleccionado = data.selected[0];
      switch (data.action) {
        case 'ready':
          map.addLayer(overlay_CapabaseGIS);
          nodo_base_anterior = nodoSeleccionado;
          break;

        case 'select_node':
          // prendo el nodo seleccionado
          switch (data.node.id) {
            case 'cbMcc':
              map.addLayer(overlay_CapabaseGIS);
              break;
            case 'mcc_dark':
              map.addLayer(overlay_CapabaseGIS_dark);
              break;
            case 'OpenstreetMap':
              map.addLayer(overlay_OSMStandard);
              break;
            case 'google_satellite':
              map.addLayer(overlay_GooglecnSatellite);
              break;
            case 'google_road':
              map.addLayer(overlay_GoogleRoad);
              break;
            case 'google_traffic':
              map.addLayer(overlay_GoogleTraffic);
              break;
            case 'google_hybrid':
              map.addLayer(overlay_Hybrid);
              break;
          }

          //deselecciona el nodo anterior
          if (data.node.id != 'google_traffic') {
            $(this).jstree('deselect_node', nodo_base_anterior);
          }

          break;

        case 'deselect_node':
          switch (data.node.id) {
            case 'cbMcc':
              map.removeLayer(overlay_CapabaseGIS);
              break;
            case 'mcc_dark':
              map.removeLayer(overlay_CapabaseGIS_dark);
              break;
            case 'OpenstreetMap':
              map.removeLayer(overlay_OSMStandard);
              break;
            case 'google_satellite':
              map.removeLayer(overlay_GooglecnSatellite);
              break;
            case 'google_road':
              map.removeLayer(overlay_GoogleRoad);
              break;
            case 'google_traffic':
              map.removeLayer(overlay_GoogleTraffic);
              break;
            case 'google_hybrid':
              map.removeLayer(overlay_Hybrid);
              break;
          }

          nodo_base_anterior = nodoSeleccionado;
          break;
      }

      nodo_base_anterior = nodoSeleccionado;
    });
  }

  return { init }
})(map);

export default arbolCapaBase;