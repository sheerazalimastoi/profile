const menuButton = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
  nav.classList.toggle('open', open);
});
nav.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
  nav.classList.remove('open');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    menuButton.click(); menuButton.focus();
  }
});
document.querySelector('.print-button').addEventListener('click', () => window.print());
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      nav.querySelectorAll('a').forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, {rootMargin: '-10% 0px -65% 0px'});
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
