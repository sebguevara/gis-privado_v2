import map from './map.js';
import mly from './mly.js';
import gog from './gog.js';


export function visor(e) {
    if (e.originalEvent.target.id != 'botonMapillary' && e.originalEvent.target.id != 'botonGoogle') {
        //Comprueba que mapillary este activo
        if ($('#botonMapillary').hasClass('mapillary-activado')) {
            abrirVisorMapillary();
            map.invalidateSize(true);

            //Si la barra lateral esta abierta la oculta
            if ($('#lateral').hasClass('abierto')) contraerBarraLateral();
            

            //Reajusta la imagen de mapillary y carga la imagen del punto seleccionado
            mly.resize();
            mly.moveCloseTo(e.latlng.lat, e.latlng.lng);

            //Posiciona el marcador en el nuevo punto seleccionado en el mapa
            if (mly.currentMarkerMly != undefined) {
                map.removeLayer(mly.currentMarkerMly);
            }
            mly.currentMarkerMly = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        } else if ($('#botonGoogle').hasClass('gog-activado')) {
            gog.handleMapClick(e.latlng);
        }
    }
}

function abrirVisorMapillary(){
    $('#mly-container').css('display', 'block');
    $('#map').css('height', '50vh');
}

