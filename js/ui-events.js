document.getElementById("btn-contraer").addEventListener('click', function (ev) {
  contraerBarraLateral();
  menu_abierto = false;
}, false);

function contraerBarraLateral() {

  menu_abierto = false;
  $('#lateral').animate({
    left: 7
  }, 400, function () {

    $('#lateral').animate({
      left: -400
    }, 400);

  });

  $('#lateral').addClass('cerrado');
  $('#lateral').removeClass('abierto');
}

document.getElementById("btn-abrir").addEventListener('click', function (ev) {
  menu_abierto = true;
  $('#lateral').animate({
    left: 9
  }, 400, function () {

    $('#lateral').animate({
      left: 0
    }, 400);

  });

  $('#lateral').addClass('abierto');
  $('#lateral').removeClass('cerrado');
}, false);



