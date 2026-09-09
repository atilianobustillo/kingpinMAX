(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  if (document.querySelector('.kit-visual-grid')) {
    gsap.from('.kit-visual-grid .kit-tile', {
      opacity: 0, y: 16, scale: 0.96, duration: 0.4, ease: 'back.out(1.4)',
      stagger: { each: 0.06, from: 'start', grid: 'auto' },
      scrollTrigger: { trigger: '.kit-visual-grid', start: 'top 85%' }
    });
  }

  if (document.querySelector('.kit-list')) {
    gsap.from('.kit-list-row', {
      opacity: 0, y: 12, duration: 0.35, ease: 'power1.out',
      stagger: 0.06,
      scrollTrigger: { trigger: '.kit-list', start: 'top 85%' }
    });
  }

  if (document.querySelector('.grid-quotes')) {
    gsap.from('.grid-quotes .quote', {
      opacity: 0, y: 16, duration: 0.35, ease: 'power1.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.grid-quotes', start: 'top 85%' }
    });
  }
})();
