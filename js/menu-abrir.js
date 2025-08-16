document.addEventListener('DOMContentLoaded', function() {
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.menu');
  if (!menuBtn || !menu) return;

  function abrirMenu() {
    menu.classList.toggle('menu-aberta');
  }

  menuBtn.addEventListener('click', abrirMenu);
});
