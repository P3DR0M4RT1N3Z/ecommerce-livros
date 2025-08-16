document.addEventListener('DOMContentLoaded', function() {
  var header = document.querySelector('.main-header');
  var menuBtn = document.querySelector('.menu-btn');
  // Torna o botão do menu sanduíche sempre fixo e independente do cabeçalho
  if (menuBtn) {
    menuBtn.style.position = 'fixed';
    menuBtn.style.top = '1.2rem';
    menuBtn.style.left = '1.2rem';
    menuBtn.style.zIndex = '3000';
  }
  var lastScroll = window.scrollY;
  var ticking = false;

  function handleHeaderHide() {
    if (window.innerWidth > 900) {
      header.style.transform = '';
      header.style.transition = '';
      header.style.top = '';
      return;
    }
    var currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 50) {
      // Rolando para baixo, esconde o cabeçalho
      header.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1)';
      header.style.transform = 'translateY(-100%)';
      // O botão do menu sanduíche permanece fixo e visível
    } else {
      // Rolando para cima, mostra o cabeçalho
      header.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1)';
      header.style.transform = 'translateY(0)';
      // O botão do menu sanduíche permanece fixo e visível
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleHeaderHide();
        ticking = false;
      });
      ticking = true;
    }
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 900) {
      header.style.transform = '';
      header.style.transition = '';
      header.style.top = '';
      if (menuBtn) {
        menuBtn.style.position = '';
        menuBtn.style.top = '';
        menuBtn.style.left = '';
        menuBtn.style.zIndex = '';
      }
    } else {
      if (menuBtn) {
        menuBtn.style.position = 'fixed';
        menuBtn.style.top = '1.2rem';
        menuBtn.style.left = '1.2rem';
        menuBtn.style.zIndex = '3000';
      }
    }
  });
});
