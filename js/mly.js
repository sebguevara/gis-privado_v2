import map from './map.js';
var mly = (function(map){

    var btnCerrarMapillary$ = document.getElementById('cerrarVisorMapillary');
    var mlyContainer$ = document.querySelector('#mly-container');
    var img;

    btnCerrarMapillary$.addEventListener('click', function(){
        mlyContainer$.style.display = 'none';
        document.getElementById("map").style.height = '100vh';
        map.invalidateSize(true);
    });

    var mapillary = new Mapillary.Viewer('mly', 'TzBSZkNEcnZ4V2JuZnlnZ0Y1dDJaQTozODA3YTljY2JhNWQ5NzJj', null, {
        component: {
            cache: true,
            cover: false,
            attribution: true,
            marker: true
        },
        baseImageSize: Mapillary.ImageSize.Size320,
        basePanoramaSize: Mapillary.ImageSize.Size320,
    });


    mapillary.mostrarZonasDisponibles = () => {

        var options = {
            attribution: true,
            interactive: true,
            maxNativeZoom: 14,
            vectorTileLayerStyles: {
                "mapillary-images": {
                    radius: 1,
                    weight: 1,
                    color: "#39AF64"
                },
                "mapillary-sequences": {
                    weight: 1,
                    color: "#AF3964"
                }
            }
        }
    
        /* lyrZonaDisponible = new L.vectorGrid.protobuf("https://tiles3.mapillary.com/v0.1/{z}/{x}/{y}.mvt", options)
            .on('mouseover', function (e) {
                var url = "https://images.mapillary.com/" + e.layer.properties.key + "/thumb-320.jpg"; e.layer.properties.ikey
                L.popup()
                    .setContent("<img src='" + url + "' width='160'/>")
                    .setLatLng(e.latlng)
                    .openOn(map);
            })
            .addTo(map); */
            lyrZonaDisponible = L.tileLayer('https://raster-tiles.mapillary.com/v0.1/{z}/{x}/{y}.png', {
                maxZoom: 17,
                id: 'mapillary.sequences',
                interactive: true
            }).addTo(map);
            
        return;
    }
    
    mapillary.ocultarZonasDisponibles = () => {
        map.removeLayer(lyrZonaDisponible);
    }
    
    mapillary.currentMarkerMly = undefined;
    
    //Esto hace que el marcador se mueva en conjunto con la camara
    mapillary.on(Mapillary.Viewer.nodechanged, function(node){
        map.invalidateSize(true);
        this.currentMarkerMly.setLatLng([node.latLon.lat, node.latLon.lon]);
        map.setView([node.latLon.lat, node.latLon.lon]);
    });
    
    mapillary.on("loadingchanged", function (loading) {
        if(loading) $('#loader').css('display', 'flex');
        else $('#loader').css('display', 'none');
    });

    L.Control.Mly = L.Control.extend({
        onAdd: crearIcono,
        onRemove: function(map) { /*Nothing to do here*/ }
    });
    
    L.control.Mly = function(opts) {
        return new L.Control.Mly(opts);
    }
    
    L.control.Mly({ position: 'bottomright' }).addTo(map);

    function crearIcono(map) {
    
        img = L.DomUtil.create('img');
        img.src = 'images/mapillary-icon-circle.png';
        img.style.width = '36px';
        img.id = 'botonMapillary';
        img.style.zIndex = 2000;
        L.DomEvent.on(img, 'click', activarDesactivar);
        
        return img;
    }

    function activarDesactivar(){
        //Si el boton google esta activado lo desactiva
        if($('#botonGoogle').hasClass('gog-activado')){
            if (typeof window.desactivarStreetView === 'function') {
                window.desactivarStreetView();
            } else {
                $('#botonGoogle').removeClass('gog-activado');
            }
        }

        $('#botonMapillary').toggleClass('mapillary-activado');

        if(img.classList.contains('mapillary-activado')){
            //si mapillary esta activo muestra las zonas disponibles
            mapillary.mostrarZonasDisponibles(map);
        }else{
            //si mapillary se desactiva oculta las zonas disponibles
            mapillary.ocultarZonasDisponibles(map);
            
            //si existe algun marcador lo elimina
            if(mapillary.currentMarkerMly != undefined){
                map.removeLayer(mapillary.currentMarkerMly);
            }
        }
    }

    $(window).resize(function(){
        mapillary.resize();
    })

    return mapillary;
})(map);

export default mly;
