document.addEventListener('DOMContentLoaded', () => {
  console.log('Script Started!');

  const refs = {
    scrollLinks: document.querySelectorAll('[data-scrollto]'),
    runTexts: document.querySelectorAll('[data-runtext]'),
    accordeon: document.querySelectorAll('[data-accordeon]'),
    header: document.querySelector('.header'),
  };

  // SCROLL TO BLOCK
  refs.scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = `.${this.dataset.scrollto}`;
      const distance = document.querySelector(target).offsetTop - refs.header.getBoundingClientRect().height;
      window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });
    });
  });

  // RUNNING TEXT
  refs.runTexts.forEach(parent => {
    const runningElement = parent.querySelector('.runText__inner');
    copyMarkup(runningElement);
    cloneElement(runningElement);
    parent.classList.add('active');
  });

  function copyMarkup(element) {
    const elementWidth = element.offsetWidth;
    const parentElementWidth = element.parentElement.offsetWidth;
    const markup = element.innerHTML;
    const newMarkup = [markup];
    let counter = elementWidth;

    while (counter < parentElementWidth * 2) {
      counter += elementWidth;
      newMarkup.push(markup);
    }

    element.innerHTML = newMarkup.join('');
  }

  function cloneElement(element) {
    const parentElement = element.parentElement;
    const markup = element.outerHTML;
    parentElement.insertAdjacentHTML('beforeend', markup);
  }

  //ACCORDEON
  refs.accordeon.forEach(accordeon => {
    const head = accordeon.querySelector('.accordeon__head');
    head.addEventListener('click', function (e) {
      const actualItem = e.target.closest('.accordeon');
      closeAllAccordeons(actualItem);
      actualItem.classList.toggle('active');
      setAccordeonHeight(actualItem);
    });
  });

  function setAccordeonHeight(actualItem) {
    const body = actualItem.querySelector('.accordeon__body');
    const bodyHeight = actualItem.querySelector('.accordeon__answer').offsetHeight;
    if (actualItem.classList.contains('active')) {
      body.style.height = `${bodyHeight}px`;
      return;
    }
    body.style.height = `0px`;
  }

  function closeAllAccordeons(actualItem) {
    refs.accordeon.forEach(accordeon => {
      if (accordeon !== actualItem) {
        const body = accordeon.querySelector('.accordeon__body');
        accordeon.classList.remove('active');
        body.style.height = '0px';
      }
    });
  }
});
