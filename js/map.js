var map = L.map('map', {
    zoomControl: true, 
    maxZoom: 22, 
    minZoom: 1,
    zoom: 18,
    zoomDelta: 0.25,
    zoomSnap: 0,
}).fitBounds([
    [-27.45664518742547, -58.763208389282234],
    [-27.504312737195168, -58.87899398803712]
]);

map.zoomControl.setPosition('topright');
map.setZoom(14);
map.attributionControl.setPrefix('<a href="http://gis.ciudaddecorrientes.gov.ar" target="_blank">IDE MCC</a> &middot; ');
var hash = new L.Hash(map);
L.control.locate({ locateOptions: { maxZoom: 17}, position: 'topright' }).addTo(map);
var bounds_group = new L.featureGroup([]);

export default map;
