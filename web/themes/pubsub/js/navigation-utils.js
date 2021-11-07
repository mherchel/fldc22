/**
 * @file
 * Controls the visibility of desktop navigation.
 *
 * Shows and hides the desktop navigation based on scroll position and controls
 * the functionality of the button that shows/hides the navigation.
 */

/* eslint-disable no-inner-declarations */
((Drupal) => {
  /**
   * pubsub helper functions.
   *
   * @namespace
   */
  Drupal.pubsub = {};

  /**
   * Checks if the mobile navigation button is visible.
   *
   * @return {boolean}
   *   True if navButtons is hidden, false if not.
   */
  function isDesktopNav() {
    const mobileNavButton = document.querySelector('[data-drupal-selector="mobile-nav-button"]');
    return mobileNavButton.clientHeight === 0;
  }

  Drupal.pubsub.isDesktopNav = isDesktopNav;

})(Drupal);
