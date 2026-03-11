async function getParcelasMuni() {
    try {
        const response = await fetch('backend/api.php?query=parcelas_muni');
        const data = await response.json();

        let myStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.65,
            "fillColor": "#CCC",
            "fillOpacity": 0.40
        }

        let mygeoJSON = L.geoJSON(data, {
            style :myStyle,
            onEachFeature:  function (feature, layer) {

               

                layer.bindPopup(``, {maxWidth: 400});

                layer.on('click', async function(){
                    let { mensura,razsoc,barrio,supparcela,supconstr,valor_e,valor_t } = await mensuraYrazsoc(feature.properties['gid']);

                    let datos1 = '<div style="width:400px; overflow:auto"><h2>Parcelas Municipales</h2></div>';
                    datos1 += '<h5><b>Partida</b>: ' + feature.properties['adrema']+'</h5>';
                    datos1 += '<table class="tabla-lote" style="border: solid 1px #332E30; padding: 0 11px;">';
                    datos1 += '<tr>';
                    datos1 += '<td class="linea-rb">Mzd</td><td class="linea-rb">Mzh</td><td class="linea-rb">Letra</td><td class="linea-rb">Lote</td><td class="linea-rb"">Lote Al</td><td class="linea-rb">Mensura</td><td class="linea-rb">Titular</td>';
                    datos1 += '</tr>';
                    datos1 += '<tr>';
                    datos1 += '<td class="linea-rb">' + ((feature.properties['mzd'] == null) ? '' : feature.properties['mzd']) + '</td>';
                    datos1 += '<td class="linea-rb">' + (feature.properties['mzh'] === null ? '' : feature.properties['mzh']) + '</td>';
                    datos1 += '<td class="linea-rb">' + (feature.properties['letra'] === null ? '' : feature.properties['letra']) + '</td>';
                    datos1 += '<td class="linea-rb">' + (feature.properties['lote'] === null ? '' : feature.properties['lote']) + '</td>';
                    datos1 += '<td class="linea-rb">' + (feature.properties['loteal'] === null ? '' : feature.properties['loteal']) + '</td>';
                    datos1 += '<td class="linea-rb">' + ((feature.properties['adrema']=='PH') ? '':mensura) + '</td>';
                    datos1 += '<td class="linea-rb">' + ((feature.properties['adrema']=='PH') ? '':razsoc)+'</td>'; 
                    datos1 += '</tr>';
                    datos1 += '</table>';
                    
                    datos1 += '<h5><b>Clase: </b>'+feature.properties['clase_obj']+'</h5>'
                    datos1 += '' + '<b>Frente / Fondo:</b> ' + feature.properties['frente'] + ' / ' + feature.properties['fondo'];
                    datos1 += '<BR />' + '<b>Dirección:</b> '; 
                    datos1 += '<span id="parcel_description">'+ unescape(decodeURIComponent(feature.properties['descripcio'])) + '</span>';
                    datos1 += '<span id="parcel_puerta"> ' + feature.properties['puerta'] + '</span> <br>';
    
                    let cyd = await catalogoYdistrito(feature.properties['gid']);
                    datos1 += '<span id="distrito"><b>Distrito</b>: '+cyd.distritos+'</span><br>';
                    datos1 += '<span id="catalogado"><b>Catalogado</b>: '+((cyd.encatalogo) ? 'Si' : 'No')+'</span><br>';
                    datos1 += '<span id="barrio"><b>Barrio</b>: '+((feature.properties['adrema']=='PH') ? '':barrio)+'</span>';
    
                    if (feature.properties['adrema'] != 'PH') {
                        datos1 += '<br><span><b>Sup.total</b>: '+ supparcela+'</span><br>';
                        datos1 += '<span><b>Sup.construida</b>: '+ supconstr +'</span><br>';
                        datos1 += '<span><b>Valor edificio</b>: '+ valor_e +'</span><br>';
                        datos1 += '<span><b>Valor tierra</b>: '+ valor_t +'</span><br>';
                    }
                    
                    if(feature.properties['adrema'] == 'PH'){
                        datos1 += '<BR />' +  '<b>Piso: </b>' + (feature.properties['piso'] || '-') + ' <b>Depto: </b>' + (feature.properties['dpto'] || '-');
                        datos1 += '<BR />' + '<b>Bald&iacute;o:</b> '  + (feature.properties['baldio'] || '-');
                        let tabla1 = '<TABLE class="mr-3" border="1" style="width: auto;"><THEAD><TR><TH>ADREMAS</TH><TH>PISO</TH><TH>DPTO</TH><TH>TITULAR</TH><TH>MENSURA</TH><TH>SUPTOTAL</TH><TH>SUPCONSTR</TH><TH>VALOR EDIF</TH><TH>VALOR TIERRA</TH></TR></THEAD><TBODY id="tbody">';
                        let fila;
                        
                        //datos.features.forEach(async feature => {
                            if (feature.properties.adrema == 'PH') {
                                let a = await phToAdrema(feature.properties.gid);
                                a.forEach(adrema => {
                                    fila = '';
                                    fila += '<TR>';
                                    fila += '<TD>' + adrema['adrema'] + '</TD>';
                                    fila += '<TD>' + adrema['piso'] + '</TD>';
                                    fila += '<TD>' + adrema['dpto'] + '</TD>';
                                    fila += '<TD>' + adrema['razsoc'] + '</TD>';
                                    fila += '<TD>' + adrema['mensura'] + '</TD>';
                                    fila += '<TD>' + adrema['suptotal'] + '</TD>';
                                    fila += '<TD>' + adrema['supconstr'] + '</TD>';
                                    fila += '<TD>' + adrema['valor_e'] + '</TD>';
                                    fila += '<TD>' + adrema['valor_t'] + '</TD>';
                                    fila += '</TR>';
                                    document.querySelector('#tbody').innerHTML += fila;
                                });
    
                                document.querySelector('#parcel_description').innerHTML = unescape(decodeURIComponent(a[0].descripcion));
                                document.querySelector('#parcel_puerta').innerHTML = ' '+a[0].puerta;
                                document.querySelector('#distrito').innerHTML = '<b>Distrito</b>: '+ a[0].distrito;
                                document.querySelector('#catalogado').innerHTML = '<b>Catalogado</b>: '+ ((a[0].encatalogo == false) ? 'No' : 'Si');
                                document.querySelector('#barrio').innerHTML = '<b>Barrio</b>: ' + a[0].barrio;
                            } else {
                                fila = '';
                                fila += '<TR>';
                                fila += '<TD>' + feature.properties.adrema + '</TD>';
                                fila += '<TD>' + feature.properties.piso + '</TD>';
                                fila += '<TD>' + feature.properties.dpto + '</TD>';
                                fila += '</TR>';
                                tabla1 += fila;
                                
                            }
                        //});
                        tabla1 += '</TBODY></TABLE>';
                        datos1 += '<DIV class="text-center" style="width: 400px; max-height:200px; overflow: auto;">';
                        datos1 += tabla1;
                        
                        datos1 += '</DIV>';
                    }

                    this.setPopupContent(datos1);
                })
            }
        });

        return mygeoJSON;
    } catch (err) {
        console.log(err)
    }
}


async function getPoligonosAux() {
    const response = await fetch('backend/api.php?query=poligonos_aux');
    const data = await response.json();

    var myStyle = {
        "weight": 5,
        "opacity": 0.9,
        fillOpacity: 0.2
    };

    let mygeoJSON = L.geoJSON(data.data, {
        style: function (feature) {
            myStyle.color = feature.geometry.properties.color;
            return myStyle;
        },
    });

    return mygeoJSON;
}

async function getZonasEle() {
    const response = await fetch('backend/api.php?query=zonas_ele');
    const data = await response.json();


    var myStyle = {
        "color": "#DC143C",
        "weight": 5,
        "opacity": 0.9,
        fillOpacity: 0
    };

    let mygeoJSON = L.geoJSON(data.data, {
        style: myStyle,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`
                <h2>${feature.properties.name}</h2>
            `);
        }
    });

    return mygeoJSON;

}

function get_dependencias_municipales() {
    fetch('backend/data.php?buscar=dependencias_municipales')
        .then(res => res.json())
        .then(res => {
            let mygeoJSON = L.geoJSON(res, {
                style: pointStyle,
                pointToLayer: (geoJsonPoint, latlng) => {
                    let marker = L.circleMarker(latlng, pointStyle);
                    return marker
                },
                onEachFeature: (feature, layer) => { layer.bindPopup(feature.name); }
            });
            mygeoJSON.addTo(map)
        });
}

// ==============================================================================

async function getObras(estilos, url) {
    $('#loader').css('display', 'flex');

    const request = await fetch(url);
    const response = await request.json();


    if (response) {
        $('#loader').css('display', 'none');
    }

    if (response.tipo == 'LineString' || response.tipo == 'MultiLineString') {
        let mygeoJSON = L.geoJSON(response.data, {
            style: estilos,
            onEachFeature: function (feature, layer) {
                layer.bindPopup(`
                    <h2>${feature.properties.name || ''}</h2>
                    <b>Cantidad</b>:${feature.properties.cantidad}<br>
                    <b>Unidad</b>:${feature.properties.unidad}<br>
                    <b>Obra</b>:${feature.properties.obra}<br>
                    <b>Fondo</b>:${feature.properties.fondo}<br>
                    <b>Año</b>:${feature.properties.anio}
                `);

            }
        });

        return mygeoJSON;
    } else if (response.tipo == 'Point') {
        let mygeoJSON = L.geoJSON(response.data, {
            style: estilos,
            pointToLayer: (geoJsonPoint, latlng) => {
                return L.circleMarker(latlng, estilos);
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(`
                    <h2>${feature.properties.name}</h2>
                    <b>Cantidad</b>:${feature.properties.cantidad || 'Sin datos'}<br>
                    <b>Unidad</b>:${feature.properties.unidad}<br>
                    <b>Obra</b>:${feature.properties.obra}<br>
                    <b>Fondo</b>:${feature.properties.fondo}
                `);

            }
        });

        return mygeoJSON;
    }
}


/* async function getLedsProyectados(){
    $('#loader').css('display', 'flex');

    const request = await fetch(url);
    const response = await request.json();

    if (response) {
        $('#loader').css('display', 'none');
    }

    let mygeoJSON = L.geoJSON(response.data, {
        style: {

        },
        pointToLayer: (geoJsonPoint, latlng) => {
            return L.circleMarker(latlng, estilos);
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`
                <h2>${feature.properties.name}</h2>
                <b>Cantidad</b>:${feature.properties.cantidad || 'Sin datos'}<br>
                <b>Unidad</b>:${feature.properties.unidad}<br>
                <b>Obra</b>:${feature.properties.obra}<br>
                <b>Fondo</b>:${feature.properties.fondo}
            `);

        }
    });

    return mygeoJSON;
} */
// ==============================================================================

async function get_obras_viales(obra, estilos, nodo) {

    const request = await fetch('backend/data.php?buscar=obras_viales&obra=' + obra);
    const response = await request.json();
    let mygeoJSON = L.geoJSON(response, {
        style: estilos,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`
                <h2>${feature.properties.name || 'Sin datos'}</h2>
                <b>Actividad</b>:${feature.properties.actividad || 'Sin datos'}<br>
                <b>Fondo</b>:${feature.properties.fondo || 'Sin datos'}<br>
            `);
        }
    });


    switch (nodo) {
        case 'pavimento2':
            pavimento2 = mygeoJSON;
            capas[nodo] = pavimento2.addTo(map);
            break;
        case 'cordon_cuneta2':
            cordon_cuneta2 = mygeoJSON;
            capas[nodo] = cordon_cuneta2.addTo(map);
            break;
        case 'recapado2':
            recapado2 = mygeoJSON;
            capas[nodo] = recapado2.addTo(map);
            break;
        case 'ripio':
            ripio = mygeoJSON;
            capas[nodo] = ripio.addTo(map);
            break;

        default:
            break;
    }
}



async function getTotales() {

    $('#loaderResumen').css('display', 'flex');
    var listgroup = $('#resumen .list-group');

    const response = await fetch('backend/api.php?query=totales');
    const data = await response.json();

    if (data) $('#loaderResumen').css('display', 'none');

    data.obras_totales.forEach(element => {
        switch (element.obra) {
            case 'CORDON CUNETA':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #A747A5; color: white" id="cc_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="cc_x_estado">Por estado</li>
                `);
                data.obras_x_estado.cordon_cuneta.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center cc-estado" >
                        ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span>
                    </li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="cc_x_anio">Por año</li>
                `);

                data.obras_x_anio.cordon_cuneta.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center cc-anio" >
                            ${element.anio} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                });

                listgroup.append(`<li class="list-group-item" id="cc_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.cordon_cuneta.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center cc-fondo">
                            ${element.fondo} <span class="badge badge-light">${+element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                });
                break;

            case 'INSTALACION DE LEDS':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #FADC02; color: white" id="leds_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="leds_x_estado">Por estado</li>
                `);
                data.obras_x_estado.instalacion_leds.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center leds-estado" >
                            ${element.estado} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>`);
                });
                break;

            case 'BACHEO':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #9A9A9A; color: white" id="bacheo_total">
                        ${element.obra + ' ' + element.total + ' ' + element.unidad +' | '+ element.metros_totales + ' Mts'}
                    </li>
                    <li class="list-group-item" id="bacheo_x_estado">Por estado</li>
                `);
                data.obras_x_estado.bacheo.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center bacheo-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="bacheo_x_anio">Por año</li>
                `);

                data.obras_x_anio.bacheo.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center bacheo-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad} </span>
                        </li>
                    `);
                });

                listgroup.append(`<li class="list-group-item" id="bacheo_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.bacheo.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center bacheo-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                });
                break;

            case 'INTERVENCION EN PLAZAS':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #048C00; color: white" id="intervencion_plazas_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="plazas_x_estado">Por estado</li>
                `);
                data.obras_x_estado.intervencion_plazas.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center plazas-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="plazas_x_anio">Por año</li>
                `);

                data.obras_x_anio.intervencion_plazas.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center plazas-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad} </span>
                        </li>
                    `);
                });

                listgroup.append(`<li class="list-group-item" id="plazas_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.intervencion_plazas.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center plazas-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                });
                break;

            case 'REPARACION DE CORDONES':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #FE59C4; color: white" id="cordones_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="cordones_x_estado">Por estado</li>
                `);
                data.obras_x_estado.reparacion_cordones.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center cordones-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="cordones_x_anio">Por año</li>
                `);

                data.obras_x_anio.reparacion_cordones.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center cordones-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad} </span>
                        </li>
                    `);
                });

                listgroup.append(`<li class="list-group-item" id="cordones_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.reparacion_cordones.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center cordones-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                });
                break;

            case 'REHABILITACION DE SUMIDEROS':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #00BBFC; color: white" id="sumideros_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="sumideros_x_estado">Por estado</li>
                `);
                data.obras_x_estado.rehabilitacion_sumideros.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center sumideros-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="sumideros_x_anio">Por año</li>
                `);

                data.obras_x_anio.rehabilitacion_sumideros.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center sumideros-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad} </span>
                        </li>
                    `);
                });

                listgroup.append(`<li class="list-group-item" id="sumideros_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.rehabilitacion_sumideros.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center sumideros-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                });
                break;

            case 'REHABILITACION DE PLUVIALES':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #03E5FC; color: white" id="pluviales_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="pluviales_x_estado">Por estado</li>
                `);
                data.obras_x_estado.rehabilitacion_pluviales.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center pluviales-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="pluviales_x_anio">Por año</li>
                `);

                data.obras_x_anio.rehabilitacion_pluviales.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center pluviales-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad} </span>
                        </li>
                    `);
                });

                /* listgroup.append(`<li class="list-group-item" id="pluviales_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.rehabilitacion_pluviales.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center pluviales-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                }); */
                break;

            case 'VEREDAS':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #2D3AFD; color: white" id="veredas_total">
                        ${element.obra + ' ' + element.total + ' ' + element.unidad + ' | '  + element.metros_totales + ' Mts'}
                    </li>
                    <li class="list-group-item" id="veredas_x_estado">Por estado</li>
                `);
                data.obras_x_estado.veredas.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center veredas-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="veredas_x_anio">Por año</li>
                `);

                data.obras_x_anio.veredas.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center veredas-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad} </span>
                        </li>
                    `);
                });

                listgroup.append(`<li class="list-group-item" id="veredas_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.veredas.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center veredas-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                });
                break;

            case 'PAVIMENTO':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #FC3E3E; color: white" id="pavimento_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="pavimento_x_estado">Por estado</li>
                `);
                data.obras_x_estado.pavimento.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center pavimento-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="pavimento_x_anio">Por año</li>
                `);

                data.obras_x_anio.pavimento.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center pavimento-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad} </span>
                        </li>
                    `);
                });

                listgroup.append(`<li class="list-group-item" id="pavimento_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.pavimento.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center pavimento-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                });
                break;

            case 'RECAPADO':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #FB8C3F; color: white" id="recapado_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="recapado_x_estado">Por estado</li>
                `);
                data.obras_x_estado.recapado.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center recapado-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="recapado_x_anio">Por año</li>
                `);

                data.obras_x_anio.recapado.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center recapado-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad} </span>
                        </li>
                    `);
                });

                /* listgroup.append(`<li class="list-group-item" id="recapado_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.recapado.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center recapado-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                }); */
                break;

            case 'OBRAS DE ENRIPIADO':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #E8B00E; color: white" id="enripiado_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="enripiado_x_estado">Por estado</li>
                `);
                data.obras_x_estado.obras_enripiado.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center enripiado-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="enripiado_x_anio">Por año</li>
                `);

                data.obras_x_anio.obras_enripiado.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center enripiado-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad} </span>
                        </li>
                    `);
                });

                listgroup.append(`<li class="list-group-item" id="enripiado_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.obras_enripiado.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center enripiado-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                });
                break;

            case 'CLOACAS SOCIAL':

                listgroup.append(`
                    <li class="list-group-item " style="background-color: #855336; color: white" id="cs_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="cs_x_estado">Por estado</li>
                `);
                data.obras_x_estado.cloacas_social.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center cs-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="cs_x_anio">Por año</li>
                `);

                data.obras_x_anio.cloacas_social.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center cs-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad} </span>
                        </li>
                    `);
                });

                /* listgroup.append(`<li class="list-group-item" id="cs_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.cloacas_social.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center cs-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                }); */
                break;

            case 'CLOACAS SOCIAL CONEXIONES DOMICILIARIAS':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #855336; color: white" id="cscd_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="cscd_x_estado">Por estado</li>
                `);
                data.obras_x_estado.cloacas_social_conexiones_dom.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center cscd-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="cscd_x_anio">Por año</li>
                `);

                data.obras_x_anio.cloacas_social_conexiones_dom.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center cscd-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                });

                /* listgroup.append(`<li class="list-group-item" id="cscd_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.cloacas_social.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center cscd-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                }); */
                break;

            case 'ENTUBADO DE CRUCE DE CALLE':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #01C00D; color: white" id="ecc_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="ecc_x_estado">Por estado</li>
                `);
                data.obras_x_estado.entubado_cruce_calle.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center ecc-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="ecc_x_anio">Por año</li>
                `);

                data.obras_x_anio.entubado_cruce_calle.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center ecc-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad} </span>
                        </li>
                    `);
                });

                /* listgroup.append(`<li class="list-group-item" id="ecc_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.entubado_cruce_calle.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center ecc-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                }); */
                break;

            case 'ENTUBADO DE ACCESO DOMICILIARIO':
                listgroup.append(`
                    <li class="list-group-item " style="background-color: #01C00D; color: white" id="ead_total">${element.obra + ' ' + element.total + ' ' + element.unidad}</li>
                    <li class="list-group-item" id="ead_x_estado">Por estado</li>
                `);
                data.obras_x_estado.entubado_acceso_dom.forEach(element => {
                    listgroup.append(`<li class="list-group-item d-none justify-content-between align-items-center ead-estado" >
                    ${element.estado} <span class="badge badge-light">${element.total + ' ' + element.unidad}</span></li>`);
                });

                listgroup.append(`
                    <li class="list-group-item" id="ead_x_anio">Por año</li>
                `);

                data.obras_x_anio.entubado_acceso_dom.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center ead-anio" >
                            ${element.anio} <span class="badge badge-light"> ${element.total + ' ' + element.unidad} </span>
                        </li>
                    `);
                });

                /* listgroup.append(`<li class="list-group-item" id="ead_x_fondo">Por fondo</li>`);

                data.obras_x_fondo.entubado_acceso_dom.forEach(element => {
                    listgroup.append(`
                        <li class="list-group-item d-none justify-content-between align-items-center ead-fondo">
                            ${element.fondo} <span class="badge badge-light"> ${element.total + ' ' + element.unidad}</span>
                        </li>
                    `);
                }); */
                break;
            default:
                break;
        }


    })
}

$('#resumen .list-group').on('click', function (e) {
    switch (e.target.id) {
        case 'cc_x_estado':
            $('.cc-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'cc_x_anio':
            $('.cc-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'cc_x_fondo':
            $('.cc-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;

        case 'leds_x_estado':
            $('.leds-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'leds_x_anio':
            $('.leds-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'leds_x_fondo':
            $('.leds-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;

        case 'bacheo_x_estado':
            $('.bacheo-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'bacheo_x_anio':
            $('.bacheo-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'bacheo_x_fondo':
            $('.bacheo-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;


        case 'plazas_x_estado':
            $('.plazas-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'plazas_x_anio':
            $('.plazas-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'plazas_x_fondo':
            $('.plazas-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;

        case 'cordones_x_estado':
            $('.cordones-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'cordones_x_anio':
            $('.cordones-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'cordones_x_fondo':
            $('.cordones-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;

        case 'sumideros_x_estado':
            $('.sumideros-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'sumideros_x_anio':
            $('.sumideros-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'sumideros_x_fondo':
            $('.sumideros-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;

        case 'pluviales_x_estado':
            $('.pluviales-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'pluviales_x_anio':
            $('.pluviales-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'pluviales_x_fondo':
            $('.pluviales-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;

        case 'veredas_x_estado':
            $('.veredas-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'veredas_x_anio':
            $('.veredas-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'veredas_x_fondo':
            $('.veredas-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;

        case 'pavimento_x_estado':
            $('.pavimento-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'pavimento_x_anio':
            $('.pavimento-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'pavimento_x_fondo':
            $('.pavimento-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;

        case 'recapado_x_estado':
            $('.recapado-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'recapado_x_anio':
            $('.recapado-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'recapado_x_fondo':
            $('.recapado-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;

        case 'cs_x_estado':
            $('.cs-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'cs_x_anio':
            $('.cs-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'cs_x_fondo':
            $('.cs-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;

        case 'cscd_x_estado':
            $('.cscd-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'cscd_x_anio':
            $('.cscd-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'cscd_x_fondo':
            $('.cscd-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;


        case 'ecc_x_estado':
            $('.ecc-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'ecc_x_anio':
            $('.ecc-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'ecc_x_fondo':
            $('.ecc-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;


        case 'ead_x_estado':
            $('.ead-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'ead_x_anio':
            $('.ead-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'ead_x_fondo':
            $('.ead-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;


        case 'enripiado_x_estado':
            $('.enripiado-estado').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'enripiado_x_anio':
            $('.enripiado-anio').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        case 'enripiado_x_fondo':
            $('.enripiado-fondo').toggleClass('d-none d-flex').css('background', '#e0e0e0');
            break;
        default:
            break;
    }

});


$('#toggleResumen').click(function () {
    $(this).find('i').toggleClass('fa-info fa-times');
    $('#resumenContainer').toggleClass('expanded');
    if (!$('#resumenContainer').hasClass('expanded')) return false;
    if ($('#resumen ul').html() == "") getTotales();
})

function thousands_separators(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(",");
}