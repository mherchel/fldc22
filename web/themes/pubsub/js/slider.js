/**
 * @file
 * Customization of navigation.
 */

(function ($, Drupal) {
  /**
   * Checks if navWrapper contains "is-active" class.
   *
   * @param {Element} navWrapper
   *   Header navigation.
   *
   * @return {boolean}
   *   True if navWrapper contains "is-active" class, false if not.
   */

   $(".speaker-slider-new-design .swiper-wrapper, .sponsor-slider-new-design .swiper-wrapper, .session-slider-new-design .swiper-wrapper").slick({
      infinite: true,
      slidesToShow: 2,
      autoplay: true,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });


})(jQuery, Drupal);
