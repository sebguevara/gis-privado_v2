import map from './map.js';
import mly from './mly.js';

export var icongog = L.icon({
    iconUrl: 'images/google-map-marker.svg',
    iconAnchor:   [19, 48]
});

var gog = (function(map){

    var currentMarkerGoogle = undefined
    var viewer = undefined;

    function iniciar(e){

        setCurrentMarkerGoogle(e.latlng);

         viewer = new google.maps.StreetViewPanorama(document.getElementById('gog'), {
            position: {lat:e.latlng.lat, lng: e.latlng.lng},
            pov: {
                heading: 90,
                pitch: 0
            },
            enableCloseButton: true,
            addressControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER
            }  
        });
        viewer.addListener('visible_changed', cerrarVisor);
        viewer.addListener('position_changed', moverMarker);
    }

    function setCurrentMarkerGoogle(e){
        if(currentMarkerGoogle) currentMarkerGoogle.remove();  
        currentMarkerGoogle = L.marker([e.lat, e.lng], {icon: icongog});
        currentMarkerGoogle.addTo(map); 
    }
    

    function cerrarVisor(){
        map.removeLayer(currentMarkerGoogle);
        document.getElementById("map").style.height = '100vh';
        document.getElementById('gog-container').style.display = "none";
        map.invalidateSize(true);
    }

    function moverMarker(e){
        //Esto hace que el marcador se mueva en conjunto con la camara
        map.invalidateSize(true);
        currentMarkerGoogle.setLatLng([this.getPosition().lat(), this.getPosition().lng()]);
        map.setView([this.getPosition().lat(), this.getPosition().lng()]);
    }

    L.Control.Gog = L.Control.extend({
        onAdd: function(map) {

            var img = L.DomUtil.create('img');
            img.src = 'images/Street-View-icon.png';
            img.style.width = '36px';
            img.id = 'botonGoogle';
            L.DomEvent.on(img, 'click', function(e){

                //Si el boton mapillary esta activo lo desactiva
                if($('#botonMapillary').hasClass('mapillary-activado')){
                    $('#botonMapillary').removeClass('mapillary-activado');
                    mly.ocultarZonasDisponibles(map);
                    if(mly.currentMarkerMly != undefined){
                        map.removeLayer(mly.currentMarkerMly);
                    }
                }

                $('#botonGoogle').toggleClass('gog-activado');
            });

            return img;
        },

        onRemove: function(map) { /*Nothing to do here*/ }
    });

    L.control.Gog = opts => new L.Control.Gog(opts); 
    L.control.Gog({position: 'bottomright'}).addTo(map);

    return { iniciar };
})(map);

export default gog;
