(function(){
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if (!navToggle || !navLinks) return;

  function closeMenu(){
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function(){
    var isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', function(e){
    if (!navLinks.classList.contains('is-open')) return;
    if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
    closeMenu();
  });
})();

(function(){
  document.querySelectorAll('.accordion-trigger').forEach(function(btn){
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', function(){
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });
})();

(function(){
  var triggers = document.querySelectorAll('.kit-tile-img');
  var lightbox = document.getElementById('lightbox');
  if (!triggers.length || !lightbox) return;

  var lightboxImg = document.getElementById('lightbox-img');
  var stage = document.getElementById('lightbox-stage');
  var dimsSvg = document.getElementById('lightbox-dims');
  var closeBtn = document.getElementById('lightbox-close');
  var lastFocused = null;

  function fmtInches(v){
    return parseFloat(v.toFixed(2)).toString();
  }
  function fmtDim(inches){
    var mm = (inches * 25.4).toFixed(1);
    return fmtInches(inches) + ' in / ' + mm + ' mm';
  }

  function renderDimensions(){
    var widthIn = parseFloat(lightboxImg.dataset.widthIn);
    var heightIn = parseFloat(lightboxImg.dataset.heightIn);
    if (!widthIn || !heightIn){ dimsSvg.innerHTML = ''; return; }

    var imgRect = lightboxImg.getBoundingClientRect();
    var stageRect = stage.getBoundingClientRect();
    var x0 = imgRect.left - stageRect.left;
    var y0 = imgRect.top - stageRect.top;
    var x1 = x0 + imgRect.width;
    var y1 = y0 + imgRect.height;

    var DIM_OFFSET = 24, EXT_GAP = 4, EXT_OVERSHOOT = 4, ARROW_LEN = 8, ARROW_W = 3;

    var dimY = y0 - DIM_OFFSET;
    var extTop = dimY - EXT_OVERSHOOT;
    var extBottom = y0 - EXT_GAP;

    var dimX = x1 + DIM_OFFSET;
    var extLeft = x1 + EXT_GAP;
    var extRight = dimX + EXT_OVERSHOOT;

    var parts = [];

    parts.push('<line class="dim-ext" x1="' + x0 + '" y1="' + extBottom + '" x2="' + x0 + '" y2="' + extTop + '"></line>');
    parts.push('<line class="dim-ext" x1="' + x1 + '" y1="' + extBottom + '" x2="' + x1 + '" y2="' + extTop + '"></line>');
    parts.push('<line class="dim-line" x1="' + x0 + '" y1="' + dimY + '" x2="' + x1 + '" y2="' + dimY + '"></line>');
    parts.push('<path class="dim-arrow" d="M' + x0 + ',' + dimY + ' L' + (x0 + ARROW_LEN) + ',' + (dimY - ARROW_W) + ' L' + (x0 + ARROW_LEN) + ',' + (dimY + ARROW_W) + ' Z"></path>');
    parts.push('<path class="dim-arrow" d="M' + x1 + ',' + dimY + ' L' + (x1 - ARROW_LEN) + ',' + (dimY - ARROW_W) + ' L' + (x1 - ARROW_LEN) + ',' + (dimY + ARROW_W) + ' Z"></path>');
    parts.push('<text class="dim-label" x="' + ((x0 + x1) / 2) + '" y="' + (dimY - 8) + '" text-anchor="middle">' + fmtDim(widthIn) + '</text>');

    parts.push('<line class="dim-ext" x1="' + extLeft + '" y1="' + y0 + '" x2="' + extRight + '" y2="' + y0 + '"></line>');
    parts.push('<line class="dim-ext" x1="' + extLeft + '" y1="' + y1 + '" x2="' + extRight + '" y2="' + y1 + '"></line>');
    parts.push('<line class="dim-line" x1="' + dimX + '" y1="' + y0 + '" x2="' + dimX + '" y2="' + y1 + '"></line>');
    parts.push('<path class="dim-arrow" d="M' + dimX + ',' + y0 + ' L' + (dimX - ARROW_W) + ',' + (y0 + ARROW_LEN) + ' L' + (dimX + ARROW_W) + ',' + (y0 + ARROW_LEN) + ' Z"></path>');
    parts.push('<path class="dim-arrow" d="M' + dimX + ',' + y1 + ' L' + (dimX - ARROW_W) + ',' + (y1 - ARROW_LEN) + ' L' + (dimX + ARROW_W) + ',' + (y1 - ARROW_LEN) + ' Z"></path>');
    var hLabelX = dimX + 17, hLabelY = (y0 + y1) / 2;
    parts.push('<text class="dim-label" x="' + hLabelX + '" y="' + hLabelY + '" text-anchor="middle" transform="rotate(-90 ' + hLabelX + ' ' + hLabelY + ')">' + fmtDim(heightIn) + '</text>');

    dimsSvg.innerHTML = parts.join('');
  }

  function openLightbox(img){
    lastFocused = document.activeElement;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxImg.dataset.widthIn = img.dataset.widthIn || '';
    lightboxImg.dataset.heightIn = img.dataset.heightIn || '';
    dimsSvg.innerHTML = '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    if (lightboxImg.complete && lightboxImg.naturalWidth){
      renderDimensions();
    } else {
      lightboxImg.onload = renderDimensions;
    }
  }
  function closeLightbox(){
    lightbox.hidden = true;
    lightboxImg.src = '';
    dimsSvg.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  triggers.forEach(function(img){
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'View larger image');
    img.addEventListener('click', function(){ openLightbox(img); });
    img.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
  window.addEventListener('resize', function(){
    if (!lightbox.hidden) renderDimensions();
  });
})();

(function(){
  var form = document.getElementById('kit-form');
  var success = document.getElementById('form-success');
  if (!form || !success) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (!form.checkValidity()){
      form.reportValidity();
      return;
    }
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Submitting…';
    setTimeout(function(){
      form.hidden = true;
      success.hidden = false;
      success.focus();
    }, 700);
  });
})();
