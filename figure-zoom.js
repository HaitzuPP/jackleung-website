/**
 * Click or tap a figure to view it enlarged.
 *
 * Figures render fitted to the text column so no page scrolls sideways.
 * Reading the small labels is opt-in: opening the overlay gives the figure a
 * legible minimum width inside a pannable, pinch-zoomable panel.
 *
 * The original SVG is moved into the overlay rather than cloned. Each figure's
 * styles are scoped to its own element id (#f1 .ttl) and its arrowheads are
 * referenced by url(#f1a), so a clone would either duplicate those ids or lose
 * the styling entirely. Moving the node keeps both intact.
 */
(function () {
  'use strict';

  var figures = document.querySelectorAll('.figure svg');
  if (!figures.length) return;

  var overlay = null;
  var panel = null;
  var placeholder = document.createComment('figure-placeholder');
  var openSvg = null;
  var lastFocus = null;

  /**
   * Build the overlay once, on first use.
   * @returns {void}
   */
  function build() {
    overlay = document.createElement('div');
    overlay.className = 'fig-zoom';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Enlarged figure');

    var bar = document.createElement('div');
    bar.className = 'fig-zoom-bar';

    var hint = document.createElement('span');
    hint.textContent = 'Scroll or pinch to explore';

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'fig-zoom-close';
    close.textContent = 'Close';

    panel = document.createElement('div');
    panel.className = 'fig-zoom-body';

    bar.appendChild(hint);
    bar.appendChild(close);
    overlay.appendChild(bar);
    overlay.appendChild(panel);

    close.addEventListener('click', hide);
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay || event.target === panel) hide();
    });

    document.body.appendChild(overlay);
  }

  /**
   * Open a figure in the overlay.
   * @param {SVGElement} svg The figure to enlarge.
   * @returns {void}
   */
  function show(svg) {
    if (!overlay) build();
    lastFocus = document.activeElement;
    svg.parentNode.insertBefore(placeholder, svg);
    panel.appendChild(svg);
    openSvg = svg;
    overlay.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    overlay.querySelector('.fig-zoom-close').focus();
    // Start centred, so a figure wider than the screen does not open
    // hard against its left edge with no cue that more sits to the right.
    panel.scrollLeft = (panel.scrollWidth - panel.clientWidth) / 2;
  }

  /**
   * Close the overlay and return the figure to its place in the article.
   * @returns {void}
   */
  function hide() {
    if (!openSvg) return;
    if (placeholder.parentNode) {
      placeholder.parentNode.replaceChild(openSvg, placeholder);
    }
    openSvg = null;
    overlay.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    panel.scrollLeft = 0;
    panel.scrollTop = 0;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  Array.prototype.forEach.call(figures, function (svg) {
    svg.setAttribute('tabindex', '0');
    svg.addEventListener('click', function () { show(svg); });
    svg.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        show(svg);
      }
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && openSvg) hide();
  });
})();
