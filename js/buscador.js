
var buscador = function (map) {
  var resultados = [];
  var btnBuscar = $('#btnBuscar');
  var btnBorrarResultados = $('#btnBorrarResultados');
  var inputBusqueda = $('#input-busqueda');
  var autocompleteList = $('#autocompleteList');
  var opciones = $('#opciones');
  var btnCerrarOpciones = $('#cerrarOpciones');
  var modaltabla = $('#modaltabla');
  var tablaRes = $('#tablaRes');
  var btnCerrarTabla = $('#btnCerrarTabla ');

  var geojsonLineOptions = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
  }


  modaltabla.draggable({
    handle: ".card-header"
  });

  tablaRes.on('click', '.btn-ir', localizar);

  btnCerrarTabla.click(function () {
    modaltabla.fadeOut(200);
  })

  btnBuscar.click(function () {
    let queBusca = document.querySelector('input[name="opciones_busca-radio"]:checked').value;
    let value = inputBusqueda.val();

    switch (queBusca) {
      case 'url':
        searchFromUrl(value);
        break;
      case 'coord':
        searchFromCoord(value);
        break;
      default:
        buscar(value);
        autocompleteList.html('');
        break;
    }
  });

  btnBorrarResultados.click(function () {
    resultados.forEach((element) => {
      element.remove();
    })
    inputBusqueda.val('');
    $(this).addClass('d-none');
  });


  btnCerrarOpciones.click(ocultarOpciones);
  inputBusqueda.click(mostrarOpciones);

  /* inputBusqueda.keyup(function (e) {
      if (e.keyCode == 13) {
          e.preventDefault();
          autocompleteList.html('');
          let value = inputBusqueda.val();
          buscar(value);
      }else {
          let queBusca = document.querySelector('input[name="opciones_busca-radio"]:checked').value;
          if (queBusca == 'Calle' || queBusca == 'Barrio') {
              if ((inputBusqueda.val().length % 3) == 0) {
                  let value = inputBusqueda.val();
                  if (value != '') {
                      $.get('backend/autocompletado.php?queBusca='+queBusca+'&nombre_calle=' + value, function (response) {
                          autocompleteList.html('');
                          if (response != "-1") {
                              let data = JSON.parse(response);
                              data.forEach(element => {
                                  if (element.name) autocompleteList.append(`<option value="${element.name}">${element.name}</option>`);
                              });
                          }

                      })
                  } else { 
                      autocompleteList.html('');
                  }

              }
          }
      }
  }); */
  inputBusqueda.keyup(function (e) {
    let queBusca = document.querySelector('input[name="opciones_busca-radio"]:checked').value;
    if (e.keyCode == 13) {
      e.preventDefault();
      autocompleteList.html('');
      let value = inputBusqueda.val();

      switch (queBusca) {
        case 'url':
          searchFromUrl(value);
          break;
        case 'coord':
          searchFromCoord(value);
          break;
        default:
          buscar(value);
          break;
      }

    } else {
      if (queBusca == 'Calle' || queBusca == 'Barrio' || queBusca == 'parcelas') {
        if ((inputBusqueda.val().length % 3) == 0) {
          let value = inputBusqueda.val();
          if (value != '') {
            $.get('backend/autocompletado.php?queBusca=' + queBusca + '&nombre_calle=' + value, function (response) {
              autocompleteList.html('');
              if (response != "-1") {
                let data = JSON.parse(response);
                console.log(data);
                data.forEach(element => {
                  if (element.name || element.adrema)
                    autocompleteList.append(`
                                              <option value="${element.name || element.adrema}">
                                                  ${element.name || element.adrema}
                                              </option>
                                          `);
                });
              }

            })
          } else {
            autocompleteList.html('');
          }

        }
      }
    }
  });

  function buscar(value) {

    let datos = {};
    let queBusca = document.querySelector('input[name="opciones_busca-radio"]:checked').value;

    switch (queBusca) {
      case 'partida inmo':
        if (!validarAdrema(value)) return false;
        datos = {
          nombre_calle: value,
          queBusca: queBusca
        }
        break;
      case 'interseccion':
        let calles = value.split(',');
        datos = {
          nombre_calle: calles[0],
          nombre_calle2: calles[1],
          queBusca: queBusca
        }
        break;
      default:
        datos = {
          nombre_calle: value,
          queBusca: queBusca
        }
        break;
    }


    $.get('backend/rec_elem.php', datos, function (response) {
      let data;
      if (response.trim() == '-1') {
        mostrarMensaje('Sin resultados!');
      } else {
        try {
          data = JSON.parse(response);

          if (queBusca != 'razsoc' && queBusca != 'cuit' && queBusca != 'mensura') {
            let mygeoJSON = L.geoJSON(data, {
              style: geojsonLineOptions,
              pointToLayer: function (geoJsonPoint, latlng) {
                console.log(geoJsonPoint);
                return new L.marker(latlng).bindTooltip(data[0].name, {
                  permanent: true,
                  direction: 'right',
                  className: 'text-danger'
                })
              }
            });
            resultados.push(mygeoJSON);
            mygeoJSON.addTo(map);
            map.setView(mygeoJSON.getBounds().getCenter(), 16);
            btnBorrarResultados.removeClass('d-none');
          } else {
            if (data.length > 0) tablaResultados(data);
          }


        } catch (error) {
          console.log(error);
          mostrarMensaje('Hubo un error en el try');
        }
      }
    }).fail(function () {
      mostrarMensaje('Hubo un ERROR intentelo mas tarde!');
    });
  }




  $("input[type='radio']").checkboxradio({
    icon: false
  }).on('change', function () {
    switch (this.value) {
      case 'interseccion':
        $('#input-busqueda').attr('placeholder', 'Calles separadas por comas');
        break;
      case 'Calle':
        $('#input-busqueda').attr('placeholder', 'Buscar calle por ej: Mendoza');
        break;
      case 'Barrio':
        $('#input-busqueda').attr('placeholder', 'Buscar barrio');
        break;
      case 'partida inmo':
        $('#input-busqueda').attr('placeholder', 'Buscar partida inmobiliaria');
        break;
      case 'partida inmo':
        $('#input-busqueda').attr('placeholder', 'Buscar dependencia municipal');
        break;
      case 'plaza':
        $('#input-busqueda').attr('placeholder', 'Buscar plaza o espacio verde');
        break;
      //2346 U
      case 'mensura':
        $('#input-busqueda').attr('placeholder', 'Ejem: 2346 U');
        break;
      case 'url':
        $('#input-busqueda').attr('placeholder', 'Google Url');
        break;
      case 'coord':
        $('#input-busqueda').attr('placeholder', '-27.4711, -58.8403');
        break;
      default:
        break;
    }
  });



  function mostrarOpciones() {
    if (document.readyState == 'complete') {
      if (opciones.hasClass('oculto')) {
        opciones.removeClass('oculto');
        opciones.css({ 'maxHeight': opciones.prop('scrollHeight') + 'px' });
        opciones.css('marginBottom', '15px');
      }
    }

  }

  function ocultarOpciones() {
    opciones.addClass('oculto');
    opciones.css('maxHeight', '0px');
  }

  function mostrarMensaje(mensaje) {
    Snackbar.show({
      pos: 'bottom-left',
      text: mensaje,
      actionText: 'Entendido'
    });
  }

  function validarAdrema(value) {
    if (value.length != 9) {
      alert('El adrema debe ingresar 9 caracteres');
      return false;
    } else {
      return true;
    }

  }

  function tablaResultados(res) {
    tablaRes.find('tbody').empty();
    let filas = ``;
    res.forEach(element => {
      filas += `
              <tr>
                <td>
                  <button class="btn-ir">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <div class="d-none">${JSON.stringify(element)}</div>
                  </button>
                </td>
                <td>${element.properties.adrema || 'sin datos'}</td>
                <td>${element.properties.razsoc || 'sin datos'}</td>
                <td>${element.properties.cuit || 'sin datos'}</td>
                <td>${element.properties.resp || 'sin datos'}</td>
                <td>${element.properties.cuit_resp || 'sin datos'}</td>
                <td>${element.properties.frente || 'sin datos'}</td>
                <td>${element.properties.fondo || 'sin datos'}</td>
                <td>${element.properties.barrio || 'sin datos'}</td>
                <td>${element.properties.descripcion || 'sin datos'}</td>
                <td>${element.properties.puerta || 'sin datos'}</td>
              </tr>
            `
    });

    tablaRes.find('tbody').append(filas);
    modaltabla.fadeIn();
  }

  function localizar(e) {
    let divOculto = $(e.currentTarget).children(".d-none");
    let data = JSON.parse($(divOculto).text());
    let geojson = L.geoJSON(data, {
      style: geojsonLineOptions,
    })
    geojson.addTo(map);
    map.fitBounds(geojson.getBounds());
    resultados.push(geojson);
    btnBorrarResultados.removeClass('d-none');
  }

  function searchFromUrl(value) {
    let url = value;
    let inicio = url.indexOf('@') != -1 ? url.indexOf('@') + 1 : -1;
    if (inicio == -1) {
      inicio = url.indexOf('q=');
      let query = url.substring(inicio);
      let params = new URLSearchParams(query);
      let coord = params.get('q').split(',').map(x => parseFloat(x));
      // crear marker y agregarlo al mapa
      createMarkerFromCoord(coord)
    } else {
      let dataString = url.split('data=')[1];
      let inicio_lat = dataString.indexOf('-27');
      let inicio_lng = dataString.indexOf('-58');
      let lat = Number(dataString.slice(inicio_lat, (inicio_lat + 10)));
      let lng = Number(dataString.slice(inicio_lng, (inicio_lng + 10)));
      createMarkerFromCoord([lat, lng]);
    }
  }

  function createMarkerFromCoord(latlng) {
    let resultMarker = L.marker(latlng).addTo(map);
    resultados.push(resultMarker);
    map.setView(latlng, 16);
    btnBorrarResultados.removeClass('d-none');
  }


  function searchFromCoord(value) {
    let [lat, lng] = value.split(',');
    createMarkerFromCoord([lat, lng]);
  }
};

export default buscador;