(() => {
  'use strict';

  const video = document.querySelector('.site-hero__media video');
  const pauseButton = document.querySelector('.site-hero__play-pause');

  if (!video) return;

  /**
   * Pause by default if reduced motion is enabled (this can be overridden
   * by localStorage).
   */
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.pause();
  }

  /**
   * Pause video if localstorage indicates that its last state was paused.
   */
  if (localStorage.getItem('videoAutoPlay') === 'false') {
    video.pause();
  }
  else if (localStorage.getItem('videoAutoPlay') === 'true') {
    video.play();
  }

  /**
   * Event listener for button to play/pause video.
   */
  pauseButton.addEventListener('click', () => {
    if (video.paused) {
      video.play();
    }
    else {
      video.pause();
    }
    localStorage.setItem('videoAutoPlay', !video.paused);
  });

  /**
   * Clicking on video should also play/pause.
   */
  video.addEventListener('click', () => pauseButton.click());

  /**
   * Ensure that state of button matches playback state.
   */
  pauseButton.setAttribute('aria-pressed', video.paused);

  /**
   * Keep video button state in sync.
   */
  video.addEventListener('play', () => {
    pauseButton.setAttribute('aria-pressed', false);
  });

  video.addEventListener('pause', () => {
    pauseButton.setAttribute('aria-pressed', true);
  });

})();
