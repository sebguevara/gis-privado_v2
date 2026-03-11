L.Control.DarkMode = L.Control.extend({
  onAdd: function (map) {
    const button = L.DomUtil.create('button');
    button.classList.add('btn', 'btn-light', 'btn-theme', 'light-mode');
    button.innerHTML = '<i class="fas fa-moon"></i>';
    button.addEventListener('click', function () {
      if (this.classList.contains('light-mode')) {
        this.innerHTML = '<i class="fas fa-sun"></i>';
        $('#arbolCapaBase').jstree('select_node', 'mcc_dark');
        this.classList.remove('light-mode')
      } else {
        this.classList.add('light-mode');
        this.innerHTML = '<i class="fas fa-moon"></i>';
        $('#arbolCapaBase').jstree('select_node', 'cbMcc');
      }

    });
    L.DomEvent.disableClickPropagation(button);
    return button;
  },

  onRemove: function (map) {

  }
})


L.control.darkmode = function (opts) {
  return new L.Control.DarkMode(opts);
}