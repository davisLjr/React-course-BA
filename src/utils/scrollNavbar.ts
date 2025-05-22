export function initNavbarScroll() {
  const toggleAll = () => {
    const scrolled = window.scrollY > 0;
    document
      .querySelectorAll<HTMLElement>('.navbar')
      .forEach(nav => nav.classList.toggle('navbar--scrolled', scrolled));
  };

  window.addEventListener('scroll', toggleAll, { passive: true });
  window.addEventListener('resize', toggleAll);

  toggleAll();
}
