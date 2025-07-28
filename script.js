// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  const btnTheme = document.getElementById('btn-theme');
  const body = document.body;

  function setTheme(dark) {
    if (dark) {
      body.classList.add('dark');
      btnTheme.textContent = 'Tema Claro';
      btnTheme.setAttribute('aria-pressed', 'true');
    } else {
      body.classList.remove('dark');
      btnTheme.textContent = 'Tema Escuro';
      btnTheme.setAttribute('aria-pressed', 'false');
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  // Carregar tema salvo
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme === 'dark');

  btnTheme.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    setTheme(!isDark);
  });

  const btnAlerta = document.getElementById('btn-alerta');
  btnAlerta.addEventListener('click', () => {
    alert('Funcionalidade em desenvolvimento! Em breve terá mais recursos.');
  });

  const btnTopo = document.getElementById('btn-voltar-topo');
  btnTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
