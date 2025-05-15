const menu = document.getElementById('menu');
  const nav = document.getElementById('main-nav');

  menu.addEventListener('click', () => {
    nav.classList.toggle('open');
  });