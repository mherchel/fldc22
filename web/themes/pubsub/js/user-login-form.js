/**
 * Interactions for user login form. This script makes sure that the labels don't
 * obscure any pre-filled data (like browser cache filled data) that might be in the
 * form elements.
 */

((Drupal, once) => {
  function inputHasData(input) {
    return input.value.length > 0;
  }

  function toggleActiveLabel(input) {
    input.closest('.form-item').classList.toggle('is-filled', inputHasData(input));
  }

  function init(form) {
    const inputs = form.querySelectorAll('[data-drupal-selector="edit-name"], [data-drupal-selector="edit-pass"]');

    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        toggleActiveLabel(e.target);
      });
      toggleActiveLabel(input);
    });
  }

  Drupal.behaviors.userLoginForm = {
    attach(context) {
      once('user-login-form', '[data-drupal-selector="user-login-form"]', context).forEach(init);
    },
  };
})(Drupal, once);
