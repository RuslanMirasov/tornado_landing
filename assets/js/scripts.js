document.addEventListener('DOMContentLoaded', () => {
  const refs = {
    scrollLinks: document.querySelectorAll('[data-scrollto]'),
    runTexts: document.querySelectorAll('[data-runtext]'),
    accordeon: document.querySelectorAll('[data-accordeon]'),
    inputs: document.querySelectorAll('.input[required]'),
    forms: document.querySelectorAll('[data-form]'),
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

  // ------------------------------FORM SEND AND VALIDATION-------------------------------

  //CLEAN INPUT ON FOCUS
  refs.inputs.forEach(input => {
    input.addEventListener('focus', function () {
      this.classList.remove('red');
      const error = this.nextElementSibling;
      if (error) {
        error.style.height = '0px';
        setTimeout(() => {
          error.remove();
        }, 300);
      }
    });
  });

  //ON FORM SUBMIT ACTION
  refs.forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const form = e.target;
      const isValidForm = formValidate(form);
      if (!isValidForm) {
        return;
      }

      alert('Отправка формы');
    });
  });

  // FORM VALIDATION
  function formValidate(form) {
    const requiredFields = form.querySelectorAll('.input[required]');
    let checker = true;
    requiredFields.forEach(input => {
      if (!input.value) {
        addInputError(input, 'Заполните поле!');
        checker = false;
        return;
      }
      if (input.name == 'name' && /[^A-zА-яЁё\+ ()\-]/.test(input.value)) {
        addInputError(input, 'Имя может сожержать только буквы!');
        checker = false;
        return;
      }
      if (input.name == 'name' && input.value.length < 2) {
        addInputError(input, 'Минимум 2 символа');
        checker = false;
        return;
      }
      if (
        input.name == 'email' &&
        !/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(input.value)
      ) {
        addInputError(input, 'Не верный формат E-mail!');
        checker = false;
        return;
      }
    });
    return checker;
  }

  //ADD ERROR IN INPUT
  function addInputError(input, text) {
    input.classList.add('red');
    const label = input.closest('.label');
    const error = label.querySelector('.error span');
    if (error) {
      error.innerHTML = text;
      return;
    }
    const errorMarkup = `<div class="error"><span>${text}</span></div>`;
    label.insertAdjacentHTML('beforeend', errorMarkup);
    const newErrorEl = label.querySelector('.error');
    setTimeout(() => {
      newErrorEl.style.height = '18px';
    }, 10);
  }
});
