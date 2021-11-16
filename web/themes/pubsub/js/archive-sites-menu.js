((Drupal, once) => {
  /**
   * Navigates the user's ass to the selected URL.
   * @param {Event} e - the event object
   */
  function navigateYourAss(e) {
    const selectedIndex = e.target.selectedIndex;
    const url = e.target.querySelectorAll('option')[selectedIndex].dataset.url;

    if (url) {
      window.open(url, '_blank').focus();
    }
  }

  /**
   * Initialize and set up event listeners.
   * @param {Element} el - The <select> element with all of the options.
   */
  function init(el) {
    el.addEventListener('change', navigateYourAss);
  }

  Drupal.behaviors.archiveSitesMenu = {
    attach(context) {
      once('archive-sites-menu', '.archive-sites-menu', context).forEach(init);
    },
  };
})(Drupal, once);
