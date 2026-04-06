import map from './map.js';
import mly from './mly.js';

var gog = (function(map){
    var SEARCH_RADIUS_METERS = 120;
    var streetViewService = null;
    var selectedLatLng = null;
    var selectedMarker = null;
    var directionLine = null;

    function buildStreetViewUrl(latlng, heading){
        return 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint='
            + encodeURIComponent(latlng.lat + ',' + latlng.lng)
            + '&heading=' + encodeURIComponent(Math.round(heading))
            + '&pitch=0';
    }

    function ensureStreetViewService(){
        if (!window.google || !google.maps || !google.maps.StreetViewService) {
            showMessage('No se pudo iniciar Google Street View.');
            return null;
        }

        if (!streetViewService) {
            streetViewService = new google.maps.StreetViewService();
        }

        return streetViewService;
    }

    function openStreetView(latlng, heading){
        var popup = window.open(
            buildStreetViewUrl(latlng, heading),
            '_blank',
            'noopener,noreferrer'
        );

        if (!popup) {
            showMessage('El navegador bloqueó la nueva pestaña de Google Maps.');
            return false;
        }

        return true;
    }

    function resolveNearestPanorama(latlng){
        var service = ensureStreetViewService();
        if (!service) {
            return Promise.reject(new Error('Google Street View no disponible.'));
        }

        return new Promise(function(resolve, reject){
            service.getPanorama(
                {
                    location: { lat: latlng.lat, lng: latlng.lng },
                    radius: SEARCH_RADIUS_METERS,
                    source: google.maps.StreetViewSource.OUTDOOR
                },
                function(data, status){
                    if (status !== google.maps.StreetViewStatus.OK || !data || !data.location || !data.location.latLng) {
                        reject(new Error('No encontramos Street View cerca de ese punto.'));
                        return;
                    }

                    resolve({
                        lat: data.location.latLng.lat(),
                        lng: data.location.latLng.lng()
                    });
                }
            );
        });
    }

    function computeHeading(fromLatLng, toLatLng){
        var startLat = toRadians(fromLatLng.lat);
        var startLng = toRadians(fromLatLng.lng);
        var endLat = toRadians(toLatLng.lat);
        var endLng = toRadians(toLatLng.lng);
        var deltaLng = endLng - startLng;
        var y = Math.sin(deltaLng) * Math.cos(endLat);
        var x = Math.cos(startLat) * Math.sin(endLat)
            - Math.sin(startLat) * Math.cos(endLat) * Math.cos(deltaLng);

        return (toDegrees(Math.atan2(y, x)) + 360) % 360;
    }

    function toRadians(value){
        return value * Math.PI / 180;
    }

    function toDegrees(value){
        return value * 180 / Math.PI;
    }

    function showMessage(text){
        if (window.Snackbar && typeof Snackbar.show === 'function') {
            Snackbar.show({
                text: text,
                pos: 'bottom-left',
                duration: 4000,
                showAction: false
            });
        }
    }

    function isActive(){
        return $('#botonGoogle').hasClass('gog-activado');
    }

    function clearSelection(){
        selectedLatLng = null;
        window.isStreetViewSelectionActive = false;

        if (selectedMarker) {
            map.removeLayer(selectedMarker);
            selectedMarker = null;
        }

        if (directionLine) {
            map.removeLayer(directionLine);
            directionLine = null;
        }
    }

    function desactivar(){
        $('#botonGoogle').removeClass('gog-activado');
        map.closePopup();
        clearSelection();
    }

    function activar(){
        $('#botonGoogle').addClass('gog-activado');
        map.closePopup();
        clearSelection();
        window.isStreetViewSelectionActive = true;
        showMessage('Google Street View: hacé clic en el punto y luego un segundo clic para indicar hacia dónde mirar.');
    }

    function toggle(){
        if (isActive()) {
            desactivar();
            return;
        }

        // Si el boton mapillary esta activo lo desactiva.
        if($('#botonMapillary').hasClass('mapillary-activado')){
            $('#botonMapillary').removeClass('mapillary-activado');
            mly.ocultarZonasDisponibles(map);
            if(mly.currentMarkerMly != undefined){
                map.removeLayer(mly.currentMarkerMly);
            }
        }

        activar();
    }

    function createSelectionMarker(latlng){
        selectedMarker = L.circleMarker(latlng, {
            radius: 8,
            color: '#f1592a',
            weight: 3,
            fillColor: '#ffd24d',
            fillOpacity: 0.95
        }).addTo(map);

        selectedMarker.bindTooltip('1. Ubicación', {
            permanent: true,
            direction: 'top',
            offset: [0, -10],
            className: 'google-selection-tooltip'
        }).openTooltip();
    }

    function createDirectionLine(latlng){
        directionLine = L.polyline([latlng, latlng], {
            color: '#f1592a',
            weight: 4,
            opacity: 0.95,
            dashArray: '10, 8'
        }).addTo(map);
    }

    function updateDirectionLine(latlng){
        if (!directionLine || !selectedLatLng) return;
        directionLine.setLatLngs([selectedLatLng, latlng]);
    }

    function handleFirstClick(latlng){
        clearSelection();
        selectedLatLng = latlng;
        createSelectionMarker(latlng);
        createDirectionLine(latlng);
        showMessage('Ahora hacé un segundo clic en el mapa para indicar hacia dónde tiene que mirar la cámara.');
    }

    function handleSecondClick(latlng){
        var directionLatLng = { lat: latlng.lat, lng: latlng.lng };
        updateDirectionLine(directionLatLng);

        resolveNearestPanorama(selectedLatLng)
            .then(function(panoramaLatLng){
                var heading = computeHeading(panoramaLatLng, directionLatLng);
                var opened = openStreetView(panoramaLatLng, heading);
                clearSelection();
                if (opened) {
                    desactivar();
                }
            })
            .catch(function(error){
                clearSelection();
                showMessage(error.message || 'No encontramos Street View cerca de ese punto.');
            });
    }

    function handleMapClick(latlng){
        if (!isActive()) return false;

        if (!selectedLatLng) {
            handleFirstClick(latlng);
            return true;
        }

        handleSecondClick(latlng);
        return true;
    }

    function handleMapMouseMove(event){
        if (!isActive() || !selectedLatLng) return;
        updateDirectionLine(event.latlng);
    }

    L.Control.Gog = L.Control.extend({
        onAdd: function() {
            var img = L.DomUtil.create('img');
            img.src = 'images/Street-View-icon.png';
            img.style.width = '36px';
            img.id = 'botonGoogle';
            L.DomEvent.on(img, 'click', toggle);
            return img;
        },

        onRemove: function() { /*Nothing to do here*/ }
    });

    L.control.Gog = opts => new L.Control.Gog(opts);
    L.control.Gog({position: 'bottomright'}).addTo(map);
    map.on('mousemove', handleMapMouseMove);
    window.isStreetViewSelectionActive = false;
    window.desactivarStreetView = desactivar;

    return { handleMapClick, desactivar };
})(map);

export default gog;
