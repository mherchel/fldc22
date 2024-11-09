((Drupal) => {
  let button;

  function handleMouseout({ currentTarget }) {
    if (!currentTarget.contains(document.activeElement)) {
      button.setAttribute('aria-expanded', false);
      currentTarget.classList.remove('is-hover-open');
    }
  }


  function handleMouseover({ currentTarget }) {
    button.setAttribute('aria-expanded', true);
    currentTarget.classList.add('is-hover-open');
  }

  function handleClick({ currentTarget }) {
    const currentState = button.getAttribute('aria-expanded') === 'true';

    if (!currentTarget.classList.contains('is-hover-open')) {
      button.setAttribute('aria-expanded', !currentState);
    }
  }

  function init(el) {
    button = el.querySelector('.site-hero-details__button');
    button.setAttribute('aria-expanded', false);
    button.addEventListener('click', handleClick);
    el.addEventListener('mouseover', handleMouseover);
    el.addEventListener('mouseout', handleMouseout);
  }

  Drupal.behaviors.siteDetails = {
    attach(context) {
      once('site-details', '.site-hero-details', context).forEach(init);
    },
  };
})(Drupal);
