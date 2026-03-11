import map from './map.js';
import buscador from './buscador.js';
import { visor } from './visor.js';
import arbolCapaBase from './arbolCapaBase.js';
import arbolMcc from './arbolMcc.js';
map.on('click', visor);
$(document).ready(function () {
    arbolCapaBase.init();
    arbolMcc.init();
    buscador(map);
    L.control.darkmode({ position: 'topright' }).addTo(map);
});
