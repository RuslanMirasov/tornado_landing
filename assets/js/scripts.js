'use strict';

const refs = {
  scrollLinks: document.querySelectorAll('[data-scrollto]'),
  header: document.querySelector('.header'),
};

// SCROLL TO BLOCK
refs.scrollLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = `.${this.dataset.scrollto}`;
    const distance = document.querySelector(target).offsetTop - refs.header.getBoundingClientRect().height;
    window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });
    //  if (menu.classList.contains('is-open')) {
    //    menuToggle();
    //  }
  });
});
