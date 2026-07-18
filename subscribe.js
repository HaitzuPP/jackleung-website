/**
 * Newsletter subscribe form (Buttondown).
 *
 * The form posts natively to Buttondown, so it still works with JavaScript
 * disabled. This script only adds inline validation and a submitting state.
 * It deliberately never reports "subscribed": a static page cannot read the
 * provider's cross-origin response, so Buttondown's own confirmation page,
 * opened in a new tab, remains the source of truth.
 */
(function () {
  'use strict';

  var form = document.querySelector('.sub-form');
  if (!form) return;

  var input = form.querySelector('input[type="email"]');
  var button = form.querySelector('button');
  var msg = document.querySelector('.sub-msg');

  /**
   * Show a status message to the reader.
   * @param {string} text Message to display, empty string to clear.
   * @param {string} state One of "ok", "err", or "" for neutral.
   * @returns {void}
   */
  function say(text, state) {
    if (!msg) return;
    msg.textContent = text;
    msg.className = 'sub-msg' + (state ? ' is-' + state : '');
  }

  form.addEventListener('submit', function (event) {
    var value = input.value.trim();

    if (!value) {
      event.preventDefault();
      say('Enter an email address.', 'err');
      input.focus();
      return;
    }

    if (!input.checkValidity()) {
      event.preventDefault();
      say('That email address does not look right.', 'err');
      input.focus();
      return;
    }

    say('Opening confirmation in a new tab.', 'ok');
    button.disabled = true;
    window.setTimeout(function () {
      button.disabled = false;
    }, 4000);
  });

  input.addEventListener('input', function () {
    if (msg && msg.textContent) say('', '');
  });
})();
