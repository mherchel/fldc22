/**
 * Functionality to show/hide modal.
 */
((Drupal) => {
  function init(el) {
    if (!sessionStorage.getItem('showModal') === true) {
      el.showModal();
    }

    el.addEventListener('click', (e) => {
      if (!e.target.closest('.site-modal__inner')) {
        el.close();
        sessionStorage.setItem('showModal', true);
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape' ) {
        el.close();
        sessionStorage.setItem('showModal', true);
      }
    });
  }

  Drupal.behaviors.modal = {
    attach(context) {
      once('modal', '.region--modal', context).forEach(init);
    },
  };
})(Drupal);
