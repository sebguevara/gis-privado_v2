function formatoFecha(p){
    return ((p === null) ? 'sd' : new Date(p).toLocaleDateString(
        'es-AR',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      ));
}

function nvl(p) {
    if (p === null) {
        return '';
    }
    return p;
}

var wms_GIS = L.WMS.Source.extend({

    'showFeatureInfo': async function (latlng, info) {
        if (!this._map) {
            return;
        }

        if (info == '') return false;

        var datos1 = '';
        var datos = JSON.parse(info);
        

        var queLayer = datos.features[0]?.id?.split('.');

        if(queLayer == undefined) return;

        switch (queLayer[0]) {
            
            case "vw_ph_parcelas":
                datos1 = '<div><h2>PH Parcelas</h2></div>';
                datos1 += '<b>Partida:</b>: ' + datos.features[0].properties['adrema'];
                datos1 += '<BR />' + '<b>Cantidad partidas</b>: ' + datos.features[0].properties['cantidad_adremas'];
                datos1 += '<BR />' + '<b>Mzd - Mzh - letra - lote</b> ';
                datos1 += '<BR />' + datos.features[0].properties['mzd'] + ' - ' + datos.features[0].properties['mzh'] + ' - ' + datos.features[0].properties['letra'] + ' - ' + datos.features[0].properties['lote'];
                let tabla = '<TABLE class="mr-3" border="1" style="width: 250px;"><THEAD><TR><TH>ADREMAS</TH><TH>DPTO</TH><TH>PISO</TH></TR></THEAD><TBODY>';
                datos.features.forEach(feature => {
                    tabla += '<TR>';
                    tabla += '<TD>' + feature.properties['adrema'] + '</TD>';
                    tabla += '<TD>' + feature.properties['dpto'] + '</TD>';
                    tabla += '<TD>' + feature.properties['piso'] + '</TD>';
                    tabla += '</TR>';
                });
                tabla += '</TBODY></TABLE>';
                datos1 += '<DIV class="text-center" style="width: 100%; max-height:200px; overflow: auto;">';
                datos1 += tabla;
                datos1 += '</DIV>';
                break;

            case "vw_parcelas": { //se usa este

                datos1 += `
                    <div class="alert alert-warning d-none alert-sin-datos-inscrip" role="alert">
                        <i class="fas fa-exclamation-circle"></i> SIN DATOS DE INSCRIPCION
                    </div>
                `;

                datos1 += `
                    <div class="alert alert-danger d-none  alert-pos-prescrip" role="alert">
                        <i class="fas fa-exclamation-circle"></i> POSEEDOR POR PRESCRIPCIÓN
                    </div>
                `;

                datos1 += `
                    <div class="alert alert-danger d-none  alert-encatalogo" role="alert">
                        <i class="fas fa-exclamation-circle"></i> INMUEBLE CATALOGADO
                    </div>
                `;

                
                let { mensura,razsoc,barrio,supparcela,supconstr,valor_e,valor_t, clase_obj, resp } = await mensuraYrazsoc(datos.features[0].properties['gid']);

                let search = datos.features[0].properties['adrema']!='PH' ? await inSinDatosInscripcion(datos.features[0].properties['adrema']) : false;

                
                if(search && search.located){
                    setTimeout(() => {
                        document.querySelector('.alert-sin-datos-inscrip').classList.remove('d-none')
                    }, 500);
                    
                }

                if(clase_obj == 'POS. P/PRESC.'){
                    
                    setTimeout(() => {
                        document.querySelector('.alert-pos-prescrip').classList.remove('d-none')
                    }, 500);
                }

                //A10961601
                datos1 += '<div style="width:400px; overflow:auto"><h2>Parcelario Catastral</h2></div>';
                datos1 += '<h5><b>Partida</b>: ' + datos.features[0].properties['adrema']+'</h5>';
                datos1 += '<div class="table-responsive">';
                datos1 += '<table class="tabla-lote" style="border: solid 1px #332E30; padding: 0 11px;">';
                datos1 += '<tr>';
                datos1 += '<td class="linea-rb">Mzd</td><td class="linea-rb">Mzh</td><td class="linea-rb">Letra</td><td class="linea-rb">Lote</td><td class="linea-rb"">Lote Al</td><td class="linea-rb">Mensura</td><td class="linea-rb">Titular</td><td class="linea-rb">Responsable</td>';
                datos1 += '</tr>';
                datos1 += '<tr class="'+(search.located ? 'table-warning' : '')+'">';
                datos1 += '<td class="linea-rb">' + ((datos.features[0].properties['mzd'] == null) ? '' : datos.features[0].properties['mzd']) + '</td>';
                datos1 += '<td class="linea-rb">' + (datos.features[0].properties['mzh'] === null ? '' : datos.features[0].properties['mzh']) + '</td>';
                datos1 += '<td class="linea-rb">' + (datos.features[0].properties['letra'] === null ? '' : datos.features[0].properties['letra']) + '</td>';
                datos1 += '<td class="linea-rb">' + (datos.features[0].properties['lote'] === null ? '' : datos.features[0].properties['lote']) + '</td>';
                datos1 += '<td class="linea-rb">' + (datos.features[0].properties['loteal'] === null ? '' : datos.features[0].properties['loteal']) + '</td>';
                datos1 += '<td class="linea-rb">' + ((datos.features[0].properties['adrema']=='PH') ? '':mensura) + '</td>';
                datos1 += '<td class="linea-rb">' + ((datos.features[0].properties['adrema']=='PH') ? '':razsoc) + '</td>';
                datos1 += '<td class="linea-rb">' + ((datos.features[0].properties['adrema']=='PH') ? '':(resp || 'sin datos')) + '</td>';
                datos1 += '</tr>';
                datos1 += '</table>';
                datos1 += '</div>';

                datos1 += '<h5 class="'+(clase_obj == 'POS. P/PRESC.' ? 'text-danger' : '')+'"><b>Clase:</b>'+(clase_obj || 'sin datos')+'</h5>'
                datos1 += '' + '<b>Frente / Fondo:</b> ' + datos.features[0].properties['frente'] + ' / ' + datos.features[0].properties['fondo'];
                datos1 += '<BR />' + '<b>Dirección:</b> ';
                datos1 += '<span id="parcel_description">'+ unescape(decodeURIComponent(datos.features[0].properties['descripcio'])) + '</span>';
                datos1 += '<span id="parcel_puerta"> ' + datos.features[0].properties['puerta'] + '</span> <br>';

                let cyd = await catalogoYdistrito(datos.features[0].properties['gid']);

                if(cyd && cyd.encatalogo){
                    setTimeout(() => {
                        document.querySelector('.alert-encatalogo').classList.remove('d-none');
                    }, 500);
                }

                datos1 += '<span id="distrito"><b>Distrito</b>: '+cyd.distritos+'</span><br>';
                datos1 += '<span id="distrito_archivo"><b>Archivo</b>:</span> <a target="_blank" href="'+'http://gis.ciudaddecorrientes.gov.ar/idemcc/images/distritos2017/'+ cyd.archivo+'">Link</a> <br>';
                datos1 += '<span id="catalogado"><b>Catalogado</b>: '+((cyd.encatalogo) ? 'Si' : 'No')+'</span><br>';
                datos1 += '<span id="barrio"><b>Barrio</b>: '+((datos.features[0].properties['adrema']=='PH') ? '':barrio)+'</span>';

                if (datos.features[0].properties['adrema'] != 'PH') {
                    datos1 += '<br><span><b>Sup.total</b>: '+ supparcela+'</span><br>';
                    datos1 += '<span><b>Sup.construida</b>: '+ supconstr +'</span><br>';
                    datos1 += '<span><b>Valor edificio</b>: '+ valor_e +'</span><br>';
                    datos1 += '<span><b>Valor tierra</b>: '+ valor_t +'</span><br>';
                }
                
                if(datos.features[0].properties['adrema'] == 'PH'){
                    datos1 += '<BR />' +  '<b>Piso: </b>' + (datos.features[0].properties['piso'] || '-') + ' <b>Depto: </b>' + (datos.features[0].properties['dpto'] || '-');
                    datos1 += '<BR />' + '<b>Bald&iacute;o:</b> '  + (datos.features[0].properties['baldio'] || '-');
                    datos1 += '<br><button id="btn-to-excel" class="btn btn-sm btn-success">Export</button>'
                    let tabla1 = '<TABLE id="table-to-excel" class="table table-sm table-bordered table-striped"  style="width: auto;"><THEAD><TR><TH>ADREMAS</TH><TH>PISO</TH><TH>DPTO</TH><TH>TITULAR</TH><TH>CLASE</TH><TH>MENSURA</TH><TH>SUPTOTAL</TH><TH>SUPCONSTR</TH><TH>VALOR EDIF</TH><TH>VALOR TIERRA</TH></TR></THEAD><TBODY id="tbody">';
                    let fila;
                    
                    datos.features.forEach(async feature => {
                        if (feature.properties.adrema == 'PH') {
                            let a = await phToAdrema(feature.properties.gid);
                            a.forEach(adrema => {
                                fila = '';
                                fila += '<TR class="'+(adrema['sin_datos_insc'] ? 'table-warning' : '')+'">';
                                fila += '<TD>' + adrema['adrema'] + '</TD>';
                                fila += '<TD>' + adrema['piso'] + '</TD>';
                                fila += '<TD>' + adrema['dpto'] + '</TD>';
                                fila += '<TD>' + adrema['razsoc'] + '</TD>';
                                fila += '<TD class="'+(adrema['clase_obj'] == 'POS. P/PRESC.' ? 'table-danger' : '')+'">' + adrema['clase_obj'] + '</TD>';
                                fila += '<TD>' + adrema['mensura'] + '</TD>';
                                fila += '<TD>' + adrema['supparcela'] + '</TD>';
                                fila += '<TD>' + adrema['supconstr'] + '</TD>';
                                fila += '<TD>' + adrema['valor_e'] + '</TD>';
                                fila += '<TD>' + adrema['valor_t'] + '</TD>';
                                fila += '</TR>';
                                document.querySelector('#tbody').innerHTML += fila;

                                if(adrema['sin_datos_insc']){
                                    document.querySelector('.alert-sin-datos-inscrip').classList.remove('d-none')
                                }
                            });

                            
                            document.querySelector('#parcel_description').innerHTML = unescape(decodeURIComponent(a[0].descripcion));
                            document.querySelector('#parcel_puerta').innerHTML = ' '+a[0].puerta;
                            document.querySelector('#distrito').innerHTML = '<b>Distrito</b>: '+ a[0].distrito;
                            document.querySelector('#catalogado').innerHTML = '<b>Catalogado</b>: '+ ((a[0].encatalogo == false) ? 'No' : 'Si');
                            document.querySelector('#barrio').innerHTML = '<b>Barrio</b>: ' + a[0].barrio;
                        } else {
                            
                            fila = '';
                            fila += '<TR class="'+(search.located ? 'table-warning' : '')+'">';
                            fila += '<TD>' + feature.properties.adrema + '</TD>';
                            fila += '<TD>' + feature.properties.piso + '</TD>';
                            fila += '<TD>' + feature.properties.dpto + '</TD>';
                            fila += '</TR>';
                            tabla1 += fila;
                            
                        }
                    });
                    tabla1 += '</TBODY></TABLE>';
                    datos1 += '<DIV class="text-center" style="max-height:200px; overflow: auto;">';
                    datos1 += tabla1;
                    

                    datos1 += '</DIV>';
                    
                    
                }
            }
            break;


            case "vw_asentamiento_renabap":
                datos1 = '<div><h2>Asentamientos Re.Na.Ba.P.</h2></div>';
                datos1 += '<b>Nombre asentamiento:</b>: ' + nvl(datos.features[0].properties['nombre_barrio']);
                break;

            case "vw_distritos_planeamiento_urbano": 
                datos1 = '<div><h2>Distritos del C&oacute;digo de Planeamiento Urbano</h2></div>';
                datos1 += '<b>Distrito:</b> ' + datos.features[0].properties['distrito'];
                datos1 += '<BR />' + '<b>F.O.S.:</b> ' + datos.features[0].properties['fos'];
                datos1 += '<BR />' + '<b>F.O.T.:</b> ' + datos.features[0].properties['fot'];
                datos1 += '<BR />' + '<b>Altura m&aacute;xima:</b> ' + datos.features[0].properties['altura_maxima'];
                datos1 += '<BR />' + '<b>Altura basamento:</b> ' + datos.features[0].properties['altura_basamento'];
                datos1 += '<BR />' + '<b>Semiperimetro:</b> ' + datos.features[0].properties['semiperimetro'];
                datos1 += '<BR />' + '<b>Perimetro libre:</b> ' + datos.features[0].properties['perimetro_libre'];
                datos1 += '<BR />' + '<b>Perimetro libre:</b> ' + datos.features[0].properties['altura_entre_medianera'];
    
                if (datos.features[0].properties['pdf_distrito_part'] != null) {
                    datos1 += '<BR />';
                    datos1 += '<BR />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gov.ar/idemcc/images/distritos2017/' + datos.features[0].properties['pdf_distrito_part'] + '">Ver la documentaci&oacute;n del distrito ' + datos.features[0].properties['distrito'] + '</a>';
                }
    
                datos1 += '<BR />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gob.ar/idemcc/images/distritos2017/Planilla4.pdf">Planilla de referencia</a>';
    
                datos1 += '<BR />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gob.ar/idemcc/images/distritos2017/CodigoPlaneamientoUrbano31-10-17.pdf">C&oacute;digo de Planiamiento Urbano</a>';
    
            break;
    
            // ejido urbano
            case "vw_ejido_urbano":
                datos1 = '<div><h2>Ejido Urbano Ciudad de Corrientes</h2></div>';
                datos1 += '<b>No hay datos para mostrar</b> ';
                break;
    
            // Medianas
            case "vw_medianas":
                datos1 = '<div><h2>Medianas de la Ciudad</h2></div>';
                datos1 += '<b>Manzana par:</b> ' + datos.features[0].properties['manzana_par'];
                datos1 += '<BR />' + '<b>Manzana impar:</b> ' + datos.features[0].properties['manzana_impar'];
                datos1 += '<BR />' + '<b>Mediana par:</b> ' + datos.features[0].properties['mediana_par'];
                datos1 += '<BR />' + '<b>Mediana impar:</b> ' + datos.features[0].properties['mediana_impar'];
    
                // Medianas - mediana par
                if (datos.features[0].properties['pdf_mediana_par'] != null) {
                    datos1 += '<br />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gob.ar/idemcc/images/fotos/medianas/' + datos.features[0].properties['pdf_mediana_par'] + '.pdf">pdf mediana par: ' + datos.features[0].properties['pdf_mediana_par'] + '.pdf</a>';
                }
    
                // Medianas - mediana impar
                if (datos.features[0].properties['pdf_mediana_impar'] != null) {
                    datos1 += '<br />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gob.ar/idemcc/images/fotos/medianas/' + datos.features[0].properties['pdf_mediana_impar'] + '.pdf">pdf mediana impar: ' + datos.features[0].properties['pdf_mediana_impar'] + '.pdf</a>';
                }
            break;
    
            // Inmuebles de valor patrimonial
            case "vw_edificios_historicos":
                datos1 = '<div><h2>Inmuebles de valor patrimonial</h2></div>';
                datos1 += '<span class="prompt1">Adrema:</span> ' + datos.features[0].properties['adrema'];
                datos1 += '<BR />' + '<span class="prompt1">Manzana:</span> ' + datos.features[0].properties['mzd'];
                datos1 += '<BR />' + '<span class="prompt1">Lote:</span> ' + datos.features[0].properties['lote'];
                datos1 += '<BR />' + '<span class="prompt1">Calle:</span> ' + datos.features[0].properties['calle'];
                datos1 += '<BR />' + '<span class="prompt1">Altura:</span> ' + datos.features[0].properties['altura'];
                datos1 += '<BR />';
    
                if (datos.features[0].properties['catalogo'] != null) {
                    datos1 += '<BR />' + '<span class="titulo1">Informaci&oacute;n relacionada</span>';
                    datos1 += '<br />' + '<a id="lnk-distrito" target="_blank" href="http://gis.ciudaddecorrientes.gov.ar/idemcc/images/fotos/catalogo_edificios_historicos/' + datos.features[0].properties['catalogo'] + '.pdf">pdf ' + datos.features[0].properties['catalogo'] + '</a>';
                }
    
                if (datos.features[0].properties['foto_num'] != null) {
                    datos1 += '<div style="/* width:300px; */ border: #666 solid 2px;"><img border="0" width="100%" src="http://gis.ciudaddecorrientes.gov.ar/idemcc/images/fotos/fotos_edificios_historicos/' + datos.features[0].properties['foto_num'] + ' .png" /></div>';
                }
            break;
    
            // parcelas por distrito
            case "vw_calculo_factibilidad":
                datos1 = '<div><h2>Parcela por distrito</h2></div>';
                datos1 += '<div><span class="prompt1">Adrema:</span>' + '<span class="infow-dato">' + nvl(datos.features[0].properties['adrema']) + '</span></div>';
                datos1 += '<div><span class="prompt1">Frente:</span>' + '<span class="infow-dato">' + nvl(datos.features[0].properties['frente']) + '</span></div>';
                datos1 += '<div><span class="prompt1">Fondo:</span>' + '<span class="infow-dato">' + nvl(datos.features[0].properties['fondo']) + '</span></div>';
                datos1 += '<div><span class="prompt1">Distritos:</span>' + '<span class="infow-dato">' + nvl(datos.features[0].properties['distritos']) + '</span></div>';
                datos1 += '<div><span class="prompt1">Barrio:</span>' + '<span class="infow-dato">' + nvl(datos.features[0].properties['barrio']) + '</span></div>';
                datos1 += '<div><span class="prompt1">Calle:</span>' + '<span class="infow-dato">' + nvl(datos.features[0].properties['calle']) + '</span></div>';
                datos1 += '<div><span class="prompt1">Altura:</span>' + '<span class="infow-dato">' + nvl(datos.features[0].properties['puerta']) + '</span></div>';
                datos1 += '<div><span class="prompt1">FOS calculado:</span>' + '<span class="infow-dato">' + nvl(datos.features[0].properties['fos_calculado']) + '</span></div>';
                datos1 += '<div><span class="prompt1">FOT entre medianera:</span>' + '<span class="infow-dato">' + nvl(datos.features[0].properties['fot_em']) + '</span></div>';
                datos1 += '<div><span class="prompt1">FOT semi-perimetro libre:</span>' + '<span class="infow-dato">' + nvl(datos.features[0].properties['fot_m2_sp']) + '</span></div>';
                datos1 += '<div><span class="prompt1">FOT perimetro libre:</span>' + '<span class="infow-dato">' + nvl(datos.features[0].properties['fot_m2_pl']) + '</span></div>';
            break;


            default:
                let rows = ``;
                const properties = datos.features[0].properties;
                for(const key in properties){
                    rows += `
                        <tr>
                            <td><b>${key}</b></td>
                            <td>${properties[key] || 'sin datos'}</td>
                        </tr>
                    `;
                }
                datos1 = `
                    <table class="table table-sm table-striped">
                        <tbody>${rows}</tbody>
                    </table>
                `;
                break;
        }


        // verifico si hay datos que mostrar
        if (datos1 != '') {
            datos1 += '<div style="width:400px; border-top: 1px solid #7f7f7f; padding-top: 7px; margin-top: 7px; font-family: Roboto; font-size: 11px; color: #7f7f7f">DIR. GRAL. DE S.I.G.</div>';
            let pop = this._map.openPopup(datos1, latlng, {maxWidth: 400});  
        } else {
            console.log('mostrar-infowindow.js - ', 'falta infowindow() para la capa: ', queLayer[0])
        }
    } 

})

function leerAjax(url, callback) {
    var context = this,
        request = new XMLHttpRequest();
    request.onreadystatechange = change;
    request.open('GET', 'backend/curl.php?url=' + url);
    request.send();

    function change() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                callback.call(context, request.responseText);
            } else {
                callback.call(context, "error");
            }
        }
    }
};

async function phToAdrema(gid) {
    const res = await fetch('backend/phToAdrema.php?gid=' + gid);
    const adremas = await res.json();
    return adremas;
}

async function catalogoYdistrito(gid){
    const res = await fetch('backend/catalogoYdistrito.php?gid=' + gid);
    const data = await res.json();
    return data;
}

async function mensuraYrazsoc(gid){
    const res = await fetch('backend/mensuraYrazsoc.php?gid=' + gid);
    const data = await res.json();
    return data;
}

async function inSinDatosInscripcion(adr){
    const response =  await fetch('backend/sindatosinsc.php?adrema='+adr);
    const data = await response.json();
    return data;
}

function getAlertSinDatosInc() {
    return `<div class="alert alert-warning" role="alert">
                <i class="fas fa-exclamation-circle"></i> SIN DATOS DE INSCRIPCION
            </div>`;
}

function getAlertPosPorPresc() {
    return `<div class="alert alert-danger" role="alert">
                <i class="fas fa-exclamation-circle"></i> POSEEDOR POR PRESCRIPCIÓN
            </div>`
}

$(document).on('click', '#btn-to-excel', function () {
  $('#table-to-excel').tblToExcel({
    complete: () => { console.log('completed') }
  });
});